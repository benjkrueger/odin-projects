export const NOTHING = 0
export const MISS = 1
export const HIT = 2
export const SHIP1 = 11
export const SHIP2 = 12
export const SHIP3 = 13
export const SHIP4 = 14
export const SHIP5 = 15

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