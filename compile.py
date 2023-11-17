from glob import glob
from os import getcwd, mkdir, scandir, system
from os.path import exists


# Change this number to determine how long each formatted line should be. Set to `0` to not add any newlines.
MAX_LEN = 100


def get_bf_files() -> list[str]: return [*glob("bf/*.bf"), *glob("bf/src/*.bf"), *glob("bf/src/**/*.bf"), *glob("bf/src/**/**/*.bf")]
def get_dirs() -> list[str]:
  dirs = ["ts", "ts/src"]

  for entry in scandir("bf/src"):
    if entry.is_dir():
      dirs.append("ts/src/%s" %entry.name)

      for subentry in scandir("bf/src/%s" %entry.name):
        if subentry.is_dir():
          dirs.append(f"ts/src/{entry.name}/{subentry.name}")

  return dirs


def make_dirs() -> bool:
  run_install = False

  for dir in get_dirs():
    if not exists(dir):
      if dir == "ts": run_install = True

      mkdir(dir)
      print("Made directory: '%s'." %dir)

  return run_install


def convert_bf_to_ts(_bffiles: list[str]) -> None:
  for bffile in _bffiles:
    bfsplit = bffile.split("bf")[1][:-1]

    if bfsplit[1:] == "env":
      tsfile = "ts%s" %f"{bfsplit[0]}.{bfsplit[1:]}"

    elif '.' not in bfsplit:
      tsfile = "ts%s.ts" %bfsplit

    else:
      tsfile = "ts%s" %bfsplit

    dumpfile = "dumps/%s.dump" %bffile.split("bf")[1].replace('\\', '/').split('.')[0].split('/')[-1]

    if not exists(tsfile):
      with open(tsfile, 'x'): pass  # Create the file and do nothing more.

    system(f"bfi --no_chr_limit --no_stdout --out={tsfile} --dump={dumpfile} {bffile}")  # Writes output to it's equivalent TS file and dumps.


def format_bf_files(_bffiles: list[str]) -> None:
  for bffile in _bffiles:
    formatted_file = "formatted%s" %bffile[2:]

    system(f"cp {bffile} {formatted_file}")
    system(f"bfi --max_len={MAX_LEN} --format={formatted_file}")


if __name__ == "__main__":
  run_install = make_dirs()
  files = get_bf_files()
  convert_bf_to_ts(files)
  format_bf_files(files)

  if run_install: system("cd %s/ts && npm i discord.js dotenv glob" %getcwd())
