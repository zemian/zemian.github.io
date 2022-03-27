Title: Parsing Arguments and Options With Python Script
Date: 2018-03-22 00:00:00-05:00
Tags: python,argparse,optparse



    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--file')
    parser.add_argument('--debug', action='store_true')
    args = parser.parse_args()

    if args.debug:
            print(f"Options: {args}")

    if args.file:
            with open(args.file) as fh:
                    for line in fh:
                            print(line, end='')

