# Harver Assessment

## Commands

`npm init`
`npm install fs path request merge-img minimist`
`npm install axios`

`node index.js`
`node index.js --greeting "Hi" --who "World" --width 400 --height 500 --color "Pink" --size 100`

## Notes

- Template literals make it easier to read and create multi line strings
- Using async/await make it easier to read easier to handle errors
- Axios is easier, more flexible and has more community support
- `arraybuffer` is used to ensure that the response data is treated as binary data. Then convert the response data to a Buffer using `Buffer.from`.

## TODO

- [X] Add package.json
- [X] Remove unwanted comments
- [X] Use modern ES syntax
- [X] Use Axios
- [X] Modularize Code
- [X] Add error handling
- [ ] Find a better/lighter package for merge-img
