---
title: Getting Project File Stats with Python
date: 2018-03-14
tags:
  - python
---

    import os, sys
    from collections import defaultdict
    if len(sys.argv) == 1:
            path = '.'
    else:
            path = sys.argv[1]
    print(f"Inspecting dir: {os.path.abspath(path)}")
    dir_count, file_count, size_count = (0, 0, 0)
    file_type_counts = defaultdict(lambda: 0)
    for dirpath, dirnames, filenames in os.walk(path):
            dir_count += len(dirnames)
            file_count += len(filenames)
            for f in filenames:
                    size_count += os.path.getsize(os.path.join(dirpath, f))
                    base, ext = os.path.splitext(f)
                    if ext == '':
                            file_type_counts[base] += 1
                    else:
                            file_type_counts[ext] += 1

    # Sort file_type_counts by value then print
    file_size = round(size_count / (1024 * 1024))
    print(f"Total file count: {file_count}")
    print(f"Total dir size: {file_size} MB")
    print(f"Total dir count: {dir_count}")
    print(f"Top 10 file type counts:")
    top_type_counts = sorted(file_type_counts, key=file_type_counts.get, reverse=True)[:10]
    for file_type in top_type_counts:
            type_count = file_type_counts[file_type]
            percentage = (type_count / file_count)
            print(f"  {file_type:25} {type_count:<10} {percentage:.1%}")
