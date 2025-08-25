import comprasService from "@/services/comprasService";

const resumoMes = async (ano: number, mes: number) => {
    const response = await comprasService.getComprasPorMes(ano, mes);
    return response;
//   const params = new URLSearchParams();
//   const rota = comprasService.getComprasPorMes(2025,8);
};

export default resumoMes;
