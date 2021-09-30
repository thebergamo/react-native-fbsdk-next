export type PropsOf<T> = T extends React.Component<infer P> ? P : never;
