import {
    CompiNPC,
    CompiNPCSystem,
    Blockchain,
    CHARACTER,
    NETWORK
} from '@compicactus/dcl-scene-utils'

export class Compicactus implements ISystem {
    META_ID = 300

    compiEntities: Array<Entity> = []

    constructor(api: any, host_data: any) {

        // TODO check if already is another system in the scene
        engine.addSystem(new CompiNPCSystem())

        this.refreshHost(host_data)
    }

    update(dt: number) {
        // Note: your code that repeats goes here
    }

    refreshHost(host:{host_data:string}) {
        this.compiEntities.forEach((entity) => {
            engine.removeEntity(entity)
        })
        this.compiEntities = []
        if (host.host_data) {
            const host_data = JSON.parse(host.host_data)

            const network_compi = new Blockchain(NETWORK.MATIC, CHARACTER.COMPICACTUS)

            host_data.compicactus.forEach((compicactus: any) => {
                if (compicactus.enable_editor) {
                    compicactus.token_id = -1
                }

                const compiEntity = new CompiNPC(compicactus.token_id, network_compi)
                compiEntity.addComponent(new Transform())
                engine.addEntity(compiEntity)

                compiEntity.getComponent(Transform).position.set(
                    compicactus.position.x,
                    compicactus.position.y,
                    compicactus.position.z
                )
                compiEntity.getComponent(Transform).rotation.setEuler(
                    compicactus.rotation.x,
                    compicactus.rotation.y,
                    compicactus.rotation.z
                )
                compiEntity.getComponent(Transform).scale.set(
                    compicactus.scale.x,
                    compicactus.scale.y,
                    compicactus.scale.z
                )

                if (compicactus.face_user) {
                    compiEntity.addComponent(new Billboard(false, true, false))
                }

                this.compiEntities.push(compiEntity)
            })
        }
    }
}
