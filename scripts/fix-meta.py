import yaml

with open("content/blog/2011/becoming-a-quartz-commiter.md", "r") as fh:
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
		print(f"{m.title()}: {mv}")

	print("\n")
	print(article_doc)