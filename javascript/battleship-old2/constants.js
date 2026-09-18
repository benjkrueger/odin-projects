export const NOTHING = 0
export const MISS = 1
export const HIT = 2
export const SHIP1 = 11
export const SHIP2 = 12
export const SHIP3 = 13
export const SHIP4 = 14
export const SHIP5 = 15
export const ALL_SHIPS = [SHIP1, SHIP2, SHIP3, SHIP4, SHIP5]
export const CONSTANT_DICT = {
    NOTHING: NOTHING,
    MISS: MISS,
    HIT: HIT,
    SHIP1: SHIP1,
    SHIP2: SHIP2,
    SHIP3: SHIP3,
    SHIP4: SHIP4,
    SHIP5: SHIP5,
}
export const COLOR_DICT = {
    [NOTHING]:"slateblue",
    [MISS]:"green",
    [HIT]:"red",
    [SHIP1]:"gray",
    [SHIP2]:"gainsboro",
    [SHIP3]:"slategray",
    [SHIP4]:"silver",
    [SHIP5]:"dimgray",
    hidden: "#141414"
}
export const SIZE_DICT = {
    [SHIP1]:5,
    [SHIP2]:4,
    [SHIP3]:3,
    [SHIP4]:3,
    [SHIP5]:2,
}

export const NAME_DICT = {
    [SHIP1]:"Carrier",
    [SHIP2]:"Battleship",
    [SHIP3]:"Cruiser",
    [SHIP4]:"Submarine",
    [SHIP5]:"Destroyer",
}

