class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)


        //create animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character',{
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character',{
                start: 0,
                end: 2
            })
        })

        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)

        cursors = this.input.keyboard.createCursorKeys()
        this.extras = this.input.keyboard.addKey("A") // I just wanted to mess with size
        this.extras2 = this.input.keyboard.addKey("D") // This one is for that as well
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0,0)
        let playerDirection = 'down'

        //pythagoreanBalance = this.PLAYER_VELOCITY / (sqrt(2 * this.PLAYER_VELOCITY^2))

        // handle left/right
        if (cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
        }
        if (cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
        }

        // handle up/down
        if (cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'

        }
        if (cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }

        playerVector.normalize()
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'

        this.player.play(playerMovement + '-' + playerDirection, true)

        if (this.extras.isDown && this.player.scale < (25)) {
            this.player.scale += 1
        }

        if (this.extras2.isDown) {
            this.player.scale = 1 + Math.sqrt(this.player.scale - 1)
        }

    }
}