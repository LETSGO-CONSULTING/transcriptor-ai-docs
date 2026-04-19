# Live Transcriptor AI -- macOS Signing & Notarization Guide

------------------------------------------------------------------------

## PASO 1: Ir a la carpeta del proyecto

``` bash
cd "/Volumes/DEV-FILES/DEVELOPER/PERSONAL-PROJECTS/LETSGO/LIVE-TRANSLATION/transcriptor-ai-app"
```

------------------------------------------------------------------------

## PASO 2: Asegurarnos que los iconos estén en `build/`

``` bash
mkdir -p build
cp "/ruta/donde/guardaste/LiveTranscriptorAI.icns" build/icon.icns
cp "/ruta/donde/guardaste/LiveTranscriptorAI.ico" build/icon.ico
```

------------------------------------------------------------------------

## PASO 3: Limpiar builds anteriores

``` bash
rm -rf release
```

------------------------------------------------------------------------

## PASO 4: Generar nuevamente la app firmada

``` bash
npm run package:mac
```

------------------------------------------------------------------------

## PASO 5: Ir a la carpeta release

``` bash
cd release
```

------------------------------------------------------------------------

## PASO 6: Verificar que la app esté firmada correctamente

``` bash
codesign -dv --verbose=4 "mac/Live Transcriptor AI.app" 2>&1 | egrep "Authority|TeamIdentifier|Runtime"
```

------------------------------------------------------------------------

# NOTARIZACIÓN

## PASO 7: Notarizar el ZIP (recomendado)

``` bash
xcrun notarytool submit "Live Transcriptor AI-2.0.1-arm64-mac.zip"   --keychain-profile "notary-profile"   --wait
```

------------------------------------------------------------------------

## PASO 8: Staple a la app

``` bash
xcrun stapler staple "mac/Live Transcriptor AI.app"
xcrun stapler validate "mac/Live Transcriptor AI.app"
```

------------------------------------------------------------------------

## PASO 9: Verificar Gatekeeper para la app

``` bash
spctl -a -vv "mac/Live Transcriptor AI.app"
```

------------------------------------------------------------------------

# SI VAS A DISTRIBUIR EL DMG

## PASO 10: Notarizar el DMG

``` bash
xcrun notarytool submit "Live Transcriptor AI-2.0.1-arm64.dmg"   --keychain-profile "notary-profile"   --wait
```

------------------------------------------------------------------------

## PASO 11: Staple al DMG

``` bash
xcrun stapler staple "Live Transcriptor AI-2.0.1-arm64.dmg"
xcrun stapler validate "Live Transcriptor AI-2.0.1-arm64.dmg"
```

------------------------------------------------------------------------

## PASO 12: Verificar el DMG

``` bash
spctl -a -vv "Live Transcriptor AI-2.0.1-arm64.dmg"
```

------------------------------------------------------------------------

# VERIFICACIÓN FINAL

## PASO 13: Montar el DMG

``` bash
hdiutil attach "Live Transcriptor AI-2.0.1-arm64.dmg"
```

------------------------------------------------------------------------

## PASO 14: Verificar la app dentro del volumen montado

``` bash
spctl -a -vv "/Volumes/Live Transcriptor AI 2.0.1-arm64/Live Transcriptor AI.app"
```

------------------------------------------------------------------------

## PASO 15: Desmontar

``` bash
hdiutil detach "/Volumes/Live Transcriptor AI 2.0.1-arm64"
```
