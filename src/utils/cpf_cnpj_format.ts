export function formatCPF(cpf: string): string {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function formatCNPJ(cnpj: string): string {
  return cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1/$2')
    .replace(/(\d{4})(\d)$/, '$1-$2');
}

export function formatCNPJ_CPF(value: string): string {
  const cleanValue = value.replace(/\D/g, ''); 

  if (cleanValue.length === 11) {
    return formatCPF(cleanValue);
  } else if (cleanValue.length === 14) {
    return formatCNPJ(cleanValue);
  }
  
  return value; 
}
