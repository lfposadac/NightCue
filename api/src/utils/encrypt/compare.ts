import bcrypt from 'bcrypt';

export async function compareString(str: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(str, hash);
    return result;
}