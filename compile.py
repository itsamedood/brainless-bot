from glob import glob
from os import getcwd, makedirs, system
from os.path import exists
from zlib import crc32


def get_bf_files(): return [f for f in glob("bf/**/*.bf", recursive=True)]
def get_ts_files(): return [f.replace("bf", "ts", 1) for f in ["%sts" %f[:-2] for f in glob("bf/**/*.bf", recursive=True)]]


def make_directories() -> bool:
  install_pkgs = not exists("ts")
  [makedirs(f, exist_ok=True) for f in [f.replace("bf", "ts", 1) for f in glob("bf/**/", recursive=True)]]

  return install_pkgs


def make_files(_files: list[str]):
  for file in _files:
    if "env" in file: file = file.replace("env.ts", ".env")
    if "package.json" in file: file = file.replace("package.json.ts", "package.json")
    if "tsconfig.json" in file: file = file.replace("tsconfig.json.ts", "tsconfig.json")

    if not exists(file):
      with open(file, 'x'): ...


def compile_bf_files(_tocompile: list[tuple[str, str]]):
  for bffile, tsfile in _tocompile:
    if "env" in tsfile: tsfile = tsfile.replace("env.ts", ".env")
    if "package.json" in tsfile: tsfile = tsfile.replace("package.json.ts", "package.json")
    if "tsconfig.json" in tsfile: tsfile = tsfile.replace("tsconfig.json.ts", "tsconfig.json")

    system(f"bfi --out={tsfile} --no_stdout --no_chr_limit {bffile}")


def dump_bf_files(_bffiles: list[str]):
  for bffile in _bffiles:
    dumpfile = "dumps/%s" %bffile.split('\\')[-1].split('/')[-1].replace(".bf", ".dump")
    system(f"bfi --dump={dumpfile} --no_stdout --no_chr_limit {bffile}")


def hash_code(_code: str): return crc32(_code.encode())


def hash_files(_bffiles: list[str]):
  hashes = 0

  for bffile in _bffiles:
    with open(bffile, 'r') as bfcode:
      global code_hash; code_hash = hash_code(bfcode.read())
      hashes += 1

    with open(".hashes", 'a' if hashes > 1 else 'w') as dothashes: dothashes.write("%s\n" %code_hash)


def read_dothashes() -> list[int]:
  if not exists(".hashes"):
    with open(".hashes", 'x'): ...
    with open(".hashes", 'r') as dothashes:
      if not len(dothashes.readlines()) > 0:
        hash_files(get_bf_files())
        exit(0)

  with open(".hashes", 'r') as dothashes: return [int(line) for line in dothashes.readlines() if len(line) > 1]


if __name__ == "__main__":
  bffiles = get_bf_files()
  tsfiles = get_ts_files()
  install_pkgs = make_directories()
  tocompile: list[tuple[str, str]] = []
  hashes = read_dothashes()

  for file in bffiles:
    with open(file, 'r') as bffile:
      if hash_code(bffile.read()) not in hashes: tocompile.append((file, "%sts" %file.replace("bf", "ts", 1)[:-2]))

  if len(tocompile) > 0:
    make_files(tsfiles)
    compile_bf_files(tocompile)
    dump_bf_files([bffile for bffile, _ in tocompile])
  else: print("Nothing to compile...")

  hash_files(bffiles)
  if install_pkgs: system("cd %s/ts && bun install discord.js dotenv glob" %getcwd())
