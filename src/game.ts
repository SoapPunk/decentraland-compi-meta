import { Compicactus } from '../metas/compicactus/compicactus'

const sampleLandOwnerData = {
  host_data: `
  {
    "compicactus": [
      {
        "position": {"x":6, "y":1, "z":8},
        "rotation": {"x":0, "y":0, "z":0},
        "scale": {"x":1, "y":1, "z":1},
        "character": "compicactus",
        "enable_editor": false,
        "token_id": 2,
        "face_user": false
      },
      {
        "position": {"x":10, "y":1, "z":8},
        "rotation": {"x":0, "y":0, "z":0},
        "scale": {"x":1, "y":1, "z":1},
        "character": "compicactus",
        "enable_editor": true,
        "token_id": 2,
        "face_user": true
      }
    ]
  }`
}

/// --- Set up your meta system to test ---
engine.addSystem(new Compicactus(null, sampleLandOwnerData))
