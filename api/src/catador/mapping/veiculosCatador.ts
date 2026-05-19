export enum TipoVeiculoEnum {
    CARRO = 1,
    CARROCA = 2,
    CARRINHO_DE_MAO = 3,
    CAMINHAO = 4,
}

export const TraducaoVeiculo: Record<TipoVeiculoEnum, string> = {
    [TipoVeiculoEnum.CARRO]: "Carro",
    [TipoVeiculoEnum.CARROCA]: "Carroça",
    [TipoVeiculoEnum.CARRINHO_DE_MAO]: "Carrinho de mão",
    [TipoVeiculoEnum.CAMINHAO]: "Caminhão",
};