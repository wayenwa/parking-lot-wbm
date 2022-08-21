
export const LOT_TYPE = {
    SMALL_LOT : 'SP',
    MEDIUM_LOT : 'MP',
    LARGE_LOT : 'LP'
};

export const LOT = [
    {
        'type'          : LOT_TYPE.SMALL_LOT,
        'chargePerHour' : 20.00,
        'occupiedBy'    : '',
        'timeOfEntry'   : '',
        'nearestExit'   : []
    },
    {
        'type'          : LOT_TYPE.MEDIUM_LOT,
        'chargePerHour' : 60.00,
        'occupiedBy'    : '' ,
        'timeOfEntry'   : '',
        'nearestExit'   : []
    },
    {
        'type'          : LOT_TYPE.LARGE_LOT,
        'chargePerHour' : 100.00,
        'occupiedBy'    : '' ,
        'timeOfEntry'   : '',
        'nearestExit'   : []
    },
    {
        'type'          : LOT_TYPE.SMALL_LOT,
        'chargePerHour' : 20.00,
        'occupiedBy'    : '' ,
        'timeOfEntry'   : '',
        'nearestExit'   : []
    },
    {
        'type'          : LOT_TYPE.MEDIUM_LOT,
        'chargePerHour' : 60.00,
        'occupiedBy'    : '' ,
        'timeOfEntry'   : '',
        'nearestExit'   : []
    },
    {
        'type'          : LOT_TYPE.LARGE_LOT,
        'chargePerHour' : 100.00,
        'occupiedBy'    : '' ,
        'timeOfEntry'   : '',
        'nearestExit'   : []
    }
];

export const CAR_TYPE = {
    S : 0,
    M : 1,
    L : 2
};

export const CAR_TYPE_LABEL = {
    S : 'SMALL',
    M : 'MEDIUM',
    L : 'LARGE'
};

export const LOTS_KEYS = [ '0', '1', '2', '3', '4', '5' ];

export const LOTS_FOR_SMALL_VEHICLE = [ '0', '1', '2', '3', '4', '5' ];
export const LOTS_FOR_MEDIUM_VEHICLE = [ '1', '2', '4', '5' ];
export const LOTS_FOR_LARGE_VEHICLE = [ '2', '5' ];


export const INITIAL_ROWS = ['A', 'B', 'C',];

export const INITIAL_ENTRY_POINTS = ['A', 'B', 'C'];
export const ENTRY_POINTS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const INIT_DATA = ['A', 'B', 'C', 'D', 'E', 'F'];

export const FLAT_RATE = 40.00;
export const FLAT_RATE_HR_LIMIT = 3;
export const ONE_DAY_RATE = 5000.00;

