const url = "https://www.google.com/maps/place/loslasszen+K%C3%B6rperarbeit/@52.8208552,13.7323408,11.66z/data=!4m8!3m7!1s0x65bc22e049d6f675:0xdce4e2f8eef8ffcc!8m2!3d52.8295141!4d13.7842476!9m1!1b1!16s%2Fg%2F11yqmkhv9t";
async function run() {
    const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const text = await res.text();
    const matches = text.match(/ChIJ[a-zA-Z0-9_-]{20,80}/g);
    if (matches) {
        console.log("Found ChIJ IDs:");
        console.log([...new Set(matches)]);
    } else {
        console.log("No Place IDs found.");
    }
}
run();
