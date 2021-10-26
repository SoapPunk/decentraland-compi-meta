import {
    CompiNPC,
    CompiNPCSystem,
    Blockchain,
    CHARACTER,
    NETWORK
} from '@compicactus/dcl-scene-utils'

export class Compicactus implements ISystem {
    META_ID = 300

    compiEntity: Entity|null = null

    constructor(api: any, host_data: any) {

        // TODO check if already is another system in the scene
        engine.addSystem(new CompiNPCSystem())

        this.refreshHost(host_data)
    }

    update(dt: number) {
        // Note: your code that repeats goes here
    }

    refreshHost(host:{host_data:string}) {
        if (this.compiEntity != null) {
            engine.removeEntity(this.compiEntity)
        }
        if (host.host_data) {
            const host_data = JSON.parse(host.host_data)

            const network_compi = new Blockchain(NETWORK.MATIC, CHARACTER.COMPICACTUS)

            if (host_data.compicactus.enable_editor) {
                host_data.compicactus.token_id = -1
            }

            this.compiEntity = new CompiNPC(host_data.compicactus.token_id, network_compi)
            this.compiEntity.addComponent(new Transform())
            engine.addEntity(this.compiEntity)

            this.compiEntity.getComponent(Transform).position.set(
                host_data.compicactus.position.x,
                host_data.compicactus.position.y,
                host_data.compicactus.position.z
            )
            this.compiEntity.getComponent(Transform).rotation.setEuler(
                host_data.compicactus.rotation.x,
                host_data.compicactus.rotation.y,
                host_data.compicactus.rotation.z
            )
            this.compiEntity.getComponent(Transform).scale.set(
                host_data.compicactus.scale.x,
                host_data.compicactus.scale.y,
                host_data.compicactus.scale.z
            )

        }
    }
}
