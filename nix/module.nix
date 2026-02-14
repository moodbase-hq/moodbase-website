{ config, lib, pkgs, ... }:

let
  cfg = config.services.moodbase-website;
  package = pkgs.callPackage ./default.nix {};
in
{
  options.services.moodbase-website = {
    enable = lib.mkEnableOption "Moodbase website static file serving via nginx";

    domain = lib.mkOption {
      type = lib.types.str;
      default = "moodbase.de";
      description = "Domain name for the website";
    };

    apiUrl = lib.mkOption {
      type = lib.types.str;
      default = "https://api.moodbase.de";
      description = "Backend API URL (used at build time via VITE_API_URL)";
    };
  };

  config = lib.mkIf cfg.enable {
    services.nginx.virtualHosts.${cfg.domain} = {
      forceSSL = true;
      enableACME = true;

      root = "${package}";

      locations."/" = {
        tryFiles = "$uri $uri/ /index.html";
      };

      # Cache static assets
      locations."/assets/" = {
        extraConfig = ''
          expires 30d;
          add_header Cache-Control "public, immutable";
        '';
      };
    };
  };
}
