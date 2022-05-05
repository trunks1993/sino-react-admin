export default (name: string) => {
  const _name = name.replace(name[0], name[0].toUpperCase());

  return `export interface QueryParams {
  filed?: string;
}

export interface RemoveParams {
  ids: string;
}

export interface ${_name} {
  id?: string;
}
`;
};
