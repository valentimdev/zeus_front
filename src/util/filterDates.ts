import comprasService from "@/services/comprasService";

/**
 * Fetches a summary of purchases for a given month and year.
 * @param {number} ano - The year.
 * @param {number} mes - The month.
 * @returns {Promise<any>} A promise that resolves with the purchase data for the specified month.
 */
const resumoMes = async (ano: number, mes: number) => {
    const response = await comprasService.getComprasPorMes(ano, mes);
    return response;
//   const params = new URLSearchParams();
//   const rota = comprasService.getComprasPorMes(2025,8);
};

export default resumoMes;
