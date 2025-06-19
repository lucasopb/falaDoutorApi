export function formatCPF(cpf: string | number): string {
  const raw = cpf.toString().padStart(11, "0").replace(/\D/g, ""); // remove qualquer coisa que não for dígito
  return raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
