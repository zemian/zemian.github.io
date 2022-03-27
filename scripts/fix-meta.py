# Convert yaml file metadata into plain Key: value pairs
#
# Requirement:
# pip install pyyaml
#

import yaml
import glob, os

files = glob.glob('content/blog/**/*.md', recursive=True)
for file in sorted(files):
	print(f"Processing {file}\n")

	os.rename(file, f"{file}.bak")

	with open(f"{file}.bak") as fh:
		with open(file, 'w') as fh_out:
			meta_doc = ''
			meta_doc_done = False
			article_doc = ''
			for line in fh.readlines():
				if not meta_doc_done:
					if line == '---\n' and meta_doc != '':
						meta_doc_done = True
					else:
						meta_doc += line
					continue
				else:
					article_doc += line


			meta = yaml.load(meta_doc, Loader=yaml.Loader)
			for m in meta:
				mv = meta[m]
				if m == 'tags':
					mv = ','.join(meta[m])
				fh_out.write(f"{m.title()}: {mv}\n")

			fh_out.write("\n\n")
			fh_out.write(article_doc)
			fh_out.write("\n")

	os.remove(f"{file}.bak")