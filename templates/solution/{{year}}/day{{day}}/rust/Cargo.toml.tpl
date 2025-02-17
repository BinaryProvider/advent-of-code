[package]
name = "aoc{{year}}{{day}}"
version = "1.0.0"
authors = ["AlexAegis <alexaegis@gmail.com>"]
license = "mit"
edition = "2018"

[lib]
name = "aoc{{year}}{{day}}"
path = "./src/lib.rs"

[dependencies]
aoclib = { path = "../../../lib/rust" }

[dev-dependencies]
criterion = "0.3.0"

[[bench]]
name = "bench"
harness = false
