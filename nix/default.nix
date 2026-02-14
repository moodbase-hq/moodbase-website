{ pkgs ? import <nixpkgs> {} }:

pkgs.buildNpmPackage rec {
  pname = "moodbase-website";
  version = "0.1.0";



  src = pkgs.lib.cleanSource ./..;

  npmDepsHash = pkgs.lib.fakeHash;
  # After first build attempt, replace npmDepsHash with the correct hash
  # from the error message, e.g.:
  # npmDepsHash = "sha256-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  nodejs = pkgs.nodejs_18;



  # The build command produces static files in dist/
  npmBuildScript = "build";

  # vite needs VITE_API_URL at build time
  env.VITE_API_URL = "https://api.moodbase.de";

  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r dist/* $out/
    runHook postInstall
  '';

  meta = with pkgs.lib; {
    description = "Moodbase website — static React frontend";
    homepage = "https://moodbase.de";
    license = licenses.mit;
  };
}
