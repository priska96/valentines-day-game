import { DialogActionEnum, GameModeEnum } from './enums';

export type KeyDirections = {
    s: number;
    a: number;
    d: number;
    w: number;
};

export const directions: KeyDirections = {
    s: 0,
    a: 1,
    d: 2,
    w: 3,
};

export type Autotile = {
    id: string;
    x: number;
    y: number;
    step: number;
    dir: number;
    autotileImg: null | string;
    stopMoving: boolean;
    type: string;
    map: string[];
    animate: string;
};
export type MovePayloadAutotile = {
    x: number;
    y: number;
    dirKey: string;
    idx: number;
};
export type BufferImagePayloadAutotile = {
    idx: number;
    autotileImg: string;
};

export type AutotileSlice = {
    autotiles: Autotile[];
    moveAutotile: (payload: MovePayloadAutotile) => void;
    bufferImageAutotile: (payload: BufferImagePayloadAutotile) => void;
    updateAutotileState: (autotiles: Autotile[]) => void;
};

export type CharSummary = {
    level: number;
    health: number;
    maxHealth: number;
    name: string;
    img: string;
    magic: number;
    attack: number;
    defense: number;
    magicDefense: number;
};

export type CharacterState = {
    x: number;
    y: number;
    step: number;
    dir: number;
    heroClass: string;
    heroImg: string | null;
    type: string;
    playerSummary: CharSummary;
    portrait: string;
    inventory: ObjectNPC[];
    animate: string;
};
export type MovePayloadChar = {
    x: number;
    y: number;
    dirKey: string;
};
export type BufferImagePayloadChar = {
    heroImg: string;
};
export type UpdatePlayerPositionPayloadChar = {
    x: number;
    y: number;
    step: number;
    dir: number;
};
export type AddToInventoryPayloadChar = {
    item: ObjectNPC;
};
export type UpdatePlayerSummaryPayloadChar = {
    updates: Partial<CharSummary>;
};

export type updateInventoryItemInUsePayloadChar = {
    id: string;
};

export type CharacterSlice = {
    character: CharacterState;
    move: (payload: MovePayloadChar) => void;
    bufferImage: (payload: BufferImagePayloadChar) => void;
    addToInventory: (payload: AddToInventoryPayloadChar) => void;
    updateInventoryItemInUse: (
        payload: updateInventoryItemInUsePayloadChar
    ) => void;
    updatePlayerPosition: (payload: UpdatePlayerPositionPayloadChar) => void;
    updatePlayerSummary: (payload: UpdatePlayerSummaryPayloadChar) => void;
    updateCharacterState: (updates: Partial<CharacterState>) => void;
};

export type NPCSummary = {
    main?: boolean;
    name?: string;
    img?: string;
    level?: number;
    health?: number;
    maxHealth?: number;
    magic?: number;
    attack?: number;
    defense?: number;
    magicDefense?: number;
};

export type NPC = {
    id: string;
    x: number;
    y: number;
    step: number;
    dir: number;
    followHero: boolean;
    heroClass: string;
    heroImg: null | string;
    stopMoving: boolean;
    type: string;
    map: string[];
    dead: boolean;
    animate: string;
    npcSummary: NPCSummary;
};

export type BufferImagePayloadNPC = {
    idx: number;
    heroImg: string;
};
export type FireActionPayloadNPC = {
    idx: number;
};

export type UpdateNPCPayload = {
    idx: number[];
    updates: { [key: string]: Partial<NPC> };
};

export type MoveNPCPayload = {
    x: number;
    y: number;
    dirKey: string;
    idx: number;
};

export type NPCSlice = {
    npcs: NPC[];
    moveNPC: (payload: MoveNPCPayload) => void;
    bufferImageNPC: (payload: BufferImagePayloadNPC) => void;
    fireActionNPC: (payload: FireActionPayloadNPC) => void;
    updateNPC: (payload: UpdateNPCPayload) => void;
    updateNPCState: (newState: NPC[]) => void;
};

export type GameState = {
    mapLoaded: boolean;
    characterLoaded: boolean;
    npcLoaded: boolean[];
    objectLoaded: boolean[];
    autotileLoaded: boolean[];
    mode: GameModeEnum;
    previousMode: GameModeEnum;
    winner: string | undefined;
    selectedOpponentIdx: number;
    map: string;
    backgroundImg: string[];
    backgroundImgLoaded: boolean;
    textureImg: string[];
    textureImgLoaded: boolean;
};

export type LoadNPCPayload = {
    idx: number;
    val: boolean;
};

export type LoadObjectPayload = {
    idx: number;
    val: boolean;
};

export type LoadAutotilePayload = {
    idx: number;
    val: boolean;
};

export type OnGameEndPayload = {
    mode: GameModeEnum;
    winner: string | undefined;
    selectedOpponentIdx: number;
};

export type BufferBackgroundImgPayload = {
    idx: number;
    backgroundImg: string;
};

export type BufferTextureImgPayload = {
    idx: number;
    textureImg: string;
};

export type GameStatusSlice = {
    gameStatus: GameState;
    loadMap: (val: boolean) => void;
    loadCharacter: (val: boolean) => void;
    loadNPC: (payload: LoadNPCPayload) => void;
    loadObject: (payload: LoadObjectPayload) => void;
    loadAutotile: (payload: LoadAutotilePayload) => void;
    onGameEnd: (payload: OnGameEndPayload) => void;
    changeMap: (map: string) => void;
    bufferBackgroundImage: (payload: BufferBackgroundImgPayload) => void;
    loadBackground: (val: boolean) => void;
    bufferTextureImage: (payload: BufferTextureImgPayload) => void;
    loadTexture: (val: boolean) => void;
    updateStatusState: (newState: GameState) => void;
};

export type ObjectNPC = {
    id: string;
    x: number;
    y: number;
    item: string;
    objectImg: string | null;
    type: string;
    map: string[];
    tookItem: boolean;
    healing: number;
    action: string;
    inUse: boolean;
};

export type FireActionObjectNPCPayload = {
    idx: number;
};

export type BufferImageObjectNPCPayload = {
    idx: number;
    objectImg: string | null;
};

export type UpdateObjectNPCPayload = {
    idx: number[];
    updates: { [key: string]: Partial<ObjectNPC> };
};

export type ObjectNPCSlice = {
    objectNPCs: ObjectNPC[];
    fireActionObjectNPC: (payload: FireActionObjectNPCPayload) => void;
    bufferImageObjectNPC: (payload: BufferImageObjectNPCPayload) => void;
    updateObjectNPC: (payload: UpdateObjectNPCPayload) => void;
    updateObjectNPCState: (newState: ObjectNPC[]) => void;
};

export type DialogState = {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: DialogActionEnum;
};

export type SetContentsPayload = {
    open: boolean;
    title: string;
    text: string;
    openerId: string;
    action: DialogActionEnum;
};

export type DialogSlice = {
    dialog: DialogState;
    setContents: (payload: SetContentsPayload) => void;
    updateDialogState: (newState: DialogState) => void;
};

export type MapState = {
    [key: string]: number;
};
export type MapImagesSlice = {
    mapImages: MapState;
    bufferMapImage: (path: string) => void;
};

export type RootStoreObjects = {
    autotiles: Autotile[];
    character: CharacterState;
    npcs: NPC[];
    gameStatus: GameState;
    dialog: DialogState;
    objectNPCs: ObjectNPC[];
    mapImages: MapState;
};
export type RootStore = AutotileSlice &
    CharacterSlice &
    NPCSlice &
    ObjectNPCSlice &
    GameStatusSlice &
    DialogSlice &
    MapImagesSlice;
