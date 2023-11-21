from glob import glob
from os import getcwd, mkdir, scandir, system
from os.path import exists
from zlib import crc32


# Change this number to determine how long each formatted line should be. Set to `0` to not add any newlines.
MAX_LEN = 100

def hash_code(_code: str): return crc32(_code.encode())
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


def hash_files(_bffiles: list[str]) -> None:
  hashes = 0

  for bffile in _bffiles:
    with open(bffile, 'r') as bfcode:
      global code_hash; code_hash = hash_code(bfcode.read())
      hashes += 1

    with open(".hashes", 'a' if hashes > 1 else 'w') as dothashes: dothashes.write("%s\n" %code_hash)


def read_dothashes() -> list[int]:
  if not exists(".hashes"):
    print("Created `.hashes`.")
    with open(".hashes", "x"): ...
    with open(".hashes", 'r') as dothashes:
      if not len(dothashes.readlines()) > 0:
        hash_files(get_bf_files())
        exit(0)

  with open(".hashes", 'r') as dothashes: return [int(line) for line in dothashes.readlines()]


def convert_bf_to_ts(_bffiles: list[str] | str) -> None:
  if type(_bffiles) is str:
    bfsplit = _bffiles.split("bf")[1][:-1]

    if bfsplit[1:] == "env":
      tsfile = "ts%s" %f"{bfsplit[0]}.{bfsplit[1:]}"

    elif '.' not in bfsplit:
      tsfile = "ts%s.ts" %bfsplit

    else:
      tsfile = "ts%s" %bfsplit

    dumpfile = "dumps/%s.dump" %_bffiles.split("bf")[1].replace('\\', '/').split('.')[0].split('/')[-1]

    if not exists(tsfile):
      with open(tsfile, 'x'): pass  # Create the file and do nothing more.

    system(f"bfi --no_chr_limit --no_stdout --out={tsfile} --dump={dumpfile} {_bffiles}")  # Writes output to it's equivalent TS file and dumps.

  else:
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


def format_bf_files(_bffiles: list[str] | str) -> None:
  if type(_bffiles) is str:
    formatted_file = "formatted%s" %_bffiles[2:]

    system(f"cp {_bffiles} {formatted_file}")
    system(f"bfi --max_len={MAX_LEN} --format={formatted_file}")

  else:
    for bffile in _bffiles:
      formatted_file = "formatted%s" %bffile[2:]

      system(f"cp {bffile} {formatted_file}")
      system(f"bfi --max_len={MAX_LEN} --format={formatted_file}")


if __name__ == "__main__":
  run_install = make_dirs()
  bffiles = get_bf_files()
  files_to_compile: list[str] = []
  hashes = read_dothashes()

  for file in bffiles:
    with open(file, 'r') as bffile:
      if hash_code(bffile.read()) not in hashes: files_to_compile.append(file)

  if len(files_to_compile) > 0:
    for file in files_to_compile:
      convert_bf_to_ts(file)
      format_bf_files(file)

  else: print("Nothing to compile.")

  hash_files(bffiles)  # Rehash all the files.
  if run_install: system("cd %s/ts && npm i discord.js dotenv glob" %getcwd())  # Install packages.
