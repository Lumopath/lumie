{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            # This makes shell scripts that will run on MacOS a bit easier to write
            coreutils-prefixed

            # Languages
            ruby_3_4
            nodejs_22
            yarn

            # Databases
            sqlite

            # Process Managers
            hivemind
            overmind

            # Other
            libyaml
            pkg-config
          ];

          shellHook = ''
            set -e

            project_root=$(greadlink -f .)
            api_root=$project_root/api
            web_root=$project_root/web
            data_dir=$project_root/.local
            bin_dir=$project_root/bin
            storage_dir=$api_root/storage

            # Web app config
            export API_HOST="127.0.0.1:3001"
            export API_PATH="/api/v1"
            export API_SCHEME="http"
            export NEXT_PUBLIC_GITPOD_WORKSPACE_URL=$GITPOD_WORKSPACE_URL

            export GEM_HOME=$data_dir/gem
            export PATH="$PATH:$bin_dir:$GEM_HOME/bin:$web_root/node_modules/.bin"
            export BUNDLE_FORCE_RUBY_PLATFORM=true

            # Required for non-NixOS installs. This should work for debian/arch based distros.
            # I'm unsure about others.
            locales=/usr/lib/locale/locale-archive
            if [[ -f $locales ]]
            then
              export LOCALE_ARCHIVE=$locales
            fi

            if ! [[ -d $data_dir ]]
            then
              sudo rm -rf .git/lfs/tmp
              git lfs fetch
              git lfs checkout
              mkdir -p $data_dir
              pushd $api_root
              bundle install
              # rake db:setup
              rake db:migrate
              popd
              pushd $web_root
              yarn install
              popd
            fi

            LOCAL_PROCFILE="Procfile.local"
            if ! [[ -f "$LOCAL_PROCFILE" ]]
            then
              echo "# Next dev server clears the console at startup, the sleeps sidestep that " >> $LOCAL_PROCFILE
              echo "api: sleep 1 && cd api && rails s -b 0.0.0.0 -p 3001" >> $LOCAL_PROCFILE
              echo "web: cd web && yarn run dev -p 3002" >> $LOCAL_PROCFILE
            fi
          '';
        };
      });
}
