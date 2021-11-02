class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad")
    this.playButton = document.querySelector(".play")
    // console.log(this.playBtn)
    this.kickAudio = document.querySelector(".kick-sound")
    this.snareAudio = document.querySelector(".snare-sound")
    this.hihatAudio = document.querySelector(".hihat-sound")
    this.index = 0
    this.bpm = 150
    // Stopping the interval from repeating on play
    this.isPlaying = null
  }
  activePad() {
    this.classList.toggle("active")
  }
  repeat() {
    // Step creates a loop.  Once index reaches 8 it is reset to 0
    let step = this.index % 8
    const activeBars = document.querySelectorAll(`.b${step}`)
    // Loop over pads
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2"
      // Check if pads are active
      if (bar.classList.contains("active")) {
        // Check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0
          this.kickAudio.play()
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0
          this.snareAudio.play()
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0
          this.hihatAudio.play()
        }
      }
    })
    this.index++
    // console.log(activeBars)
    // console.log(step)
    // console.log(`step ${step} and index ${this.index}`)
  }
  start() {
    // console.log(this)
    const interval = (60 / this.bpm) * 1000
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        // Use arrow function to have this reference the repeat instead of the window
        this.repeat()
      }, interval)
    } else {
      // Clear the interval
      clearInterval(this.isPlaying)
      this.isPlaying = null
    }
  }
}

const drumKit = new DrumKit()

// Event Listeners
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad)
  pad.addEventListener("animationend", function () {
    this.style.animation = ""
  })
})

drumKit.playButton.addEventListener("click", function () {
  drumKit.start()
})
