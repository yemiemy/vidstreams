const APP_ID = "18ea8a5e11ec4fcaa0c85d592d90a102"
const TOKEN = "00618ea8a5e11ec4fcaa0c85d592d90a102IAB+w4tgwsQKr7tt19REDzZk7E9hwpFrSv+2h7UMeoNdk2TNKL8AAAAAEADC8VeADk/nYQEAAQANT+dh"
const CHANNEL = "main"

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                    </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'
}

document.getElementById('join-btn').addEventListener('click', joinStream)