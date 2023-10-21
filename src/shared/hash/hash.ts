import { createHash } from 'crypto';

export const generate = (content: string, algorithm: string) => createHash(algorithm)
    .update(content)
    .digest('hex');

export const compare = (content: string, hash: string, algorithm: string) => generate(content, algorithm) === hash;