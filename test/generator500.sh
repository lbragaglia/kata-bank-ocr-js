#!/bin/sh
for i in `seq 0 500`; do cat test1_$((i%11)).txt; echo; done
