
const InitializeDataService = {
    init: function(rows, lots, types) {
        let result = []

        rows.map((row) => (
            result[row] = lots
        ))

        return Object.assign({}, result);
    }
};

export default InitializeDataService;