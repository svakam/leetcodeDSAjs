function collectingKeys(times) {
    if (times.length === 0) return 0;

    times.sort((a, b) => a[0] - b[0]);

    let resets = 1;
    let current = times[0];
    for (let i = 1; i < times.length; i++) {
        const next = times[i];
        // if the start of this next interval is after the end of
        // the current one, then they do NOT overlap and we must reset. 
        if (next[0] > current[1]) {
        resets++;
        current = next;
        }
    }

    return resets;
}