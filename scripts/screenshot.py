#!/usr/bin/env python3
"""Build Halcyon+, run emery emulator, screenshot, send to Telegram.

Weather and tide data are seeded via C mock init (no phone JS needed).
Settings match the deployed Halcyon+ defaults (inside tide, SF Bay mock data).
"""
import subprocess, sys, os, requests, argparse

PROJECT = os.path.expanduser('~/projects/pebble-dev/halcyon-noon-midnight')
VENV = os.path.expanduser('~/projects/pebble-dev/.venv/bin/activate')
SPI_FLASH = os.path.expanduser('~/.local/share/pebble-sdk/4.9.169/emery/qemu_spi_flash.bin')

def sh(cmd, **kw):
    return subprocess.run(f'source {VENV} && {cmd}', shell=True, executable='/bin/bash',
                          capture_output=True, text=True, **kw)

def telegram_token():
    with open(os.path.expanduser('~/.hermes/.env')) as f:
        for line in f:
            if line.startswith('TELEGRAM_BOT_TOKEN=') and not line.startswith('#'):
                return line.strip().split('=', 1)[1]
    raise RuntimeError('TELEGRAM_BOT_TOKEN not found')

def send_image(path, caption, chat_id='385284769'):
    token = telegram_token()
    with open(path, 'rb') as img:
        r = requests.post(f'https://api.telegram.org/bot{token}/sendPhoto',
                          data={'chat_id': chat_id, 'caption': caption},
                          files={'photo': img}, timeout=15)
    return r.json()

def main():
    p = argparse.ArgumentParser(description='Halcyon+ build + screenshot + Telegram')
    p.add_argument('--outside', action='store_true', help='Outside ring tide variant')
    p.add_argument('--no-send', action='store_true', help='Skip Telegram send')
    p.add_argument('--caption', default=None, help='Custom caption')
    args = p.parse_args()

    os.chdir(PROJECT)

    # Kill old emulator
    subprocess.run('pkill -9 -f qemu-pebble 2>/dev/null; pkill -9 -f pypkjs 2>/dev/null',
                   shell=True, capture_output=True)
    os.system('sleep 1')

    # Clear SPI flash for fresh defaults
    if os.path.exists(SPI_FLASH):
        os.remove(SPI_FLASH)

    # Set mode in mock data init (inside mode is default, --outside flips it)
    if args.outside:
        with open('src/c/settings.c') as f:
            content = f.read()
        if 'globalSettings.tidePlotInside = false;' not in content:
            content = content.replace(
                'globalSettings.tidePlotInside = true;   // inside ring by default',
                'globalSettings.tidePlotInside = false;  // outside ring for screenshot')
            with open('src/c/settings.c', 'w') as f:
                f.write(content)

    # Build
    r = sh('pebble build', timeout=60)
    if "'build' finished successfully" not in r.stdout:
        print(f'BUILD FAILED:\n{r.stdout}\n{r.stderr}')
        sys.exit(1)

    # Install emulator
    r = sh('DISPLAY=:99 pebble install --emulator emery build/halcyon-noon-midnight.pbw', timeout=20)
    if 'App install succeeded' not in r.stdout:
        print(f'EMULATOR INSTALL FAILED:\n{r.stdout}\n{r.stderr}')
        sys.exit(1)

    # Screenshot
    mode = 'outside' if args.outside else 'inside'
    path = f'/tmp/halcyon-emery-{mode}.png'
    r = sh(f'DISPLAY=:99 pebble screenshot {path}', timeout=15)
    if 'Saved screenshot' not in r.stdout:
        print(f'SCREENSHOT FAILED:\n{r.stdout}\n{r.stderr}')
        sys.exit(1)

    print(f'Screenshot saved: {path}')

    # Restore settings if we modified them
    if args.outside:
        with open('src/c/settings.c') as f:
            content = f.read()
        content = content.replace(
            'globalSettings.tidePlotInside = false;  // outside ring for screenshot',
            'globalSettings.tidePlotInside = true;   // inside ring by default')
        with open('src/c/settings.c', 'w') as f:
            f.write(content)

    # Send
    if not args.no_send:
        caption = args.caption or f'Halcyon+ emery - tide {mode} (SF Bay mock weather)'
        result = send_image(path, caption)
        if result.get('ok'):
            print(f'Sent: msg_id={result["result"]["message_id"]}')
        else:
            print(f'SEND FAILED: {result}')

if __name__ == '__main__':
    main()
