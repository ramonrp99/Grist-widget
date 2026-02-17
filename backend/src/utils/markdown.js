// Divide tabla markdown en filas
const splitTableIntoRows = (table) => {
    return table
        .split(/\n/)
}

module.exports = { splitTableIntoRows }