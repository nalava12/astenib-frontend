import forge from 'node-forge'

export function encryptContent(content: string, password: string): string {
  let salt = forge.random.getBytesSync(16)
  let key = forge.pkcs5.pbkdf2(password, salt, 10000, 32);
  let iv = forge.random.getBytesSync(32)

  let cipher = forge.cipher.createCipher('AES-CBC', key)
  cipher.start({iv})

  const encoder = new TextEncoder()

  cipher.update(new forge.util.ByteStringBuffer(encoder.encode(content)))
  cipher.finish()

  let output = forge.util.createBuffer();
  output.putBytes(salt)
  output.putBytes(iv)
  output.putBuffer(cipher.output)
  
  return window.btoa(output.getBytes())
}

export function decryptContent(encrypted: string, password: string): string {
  let content = window.atob(encrypted)
  let input = forge.util.createBuffer(content, 'raw')

  let salt = input.getBytes(16)

  let key = forge.pkcs5.pbkdf2(password, salt, 10000, 32)
  let iv = input.getBytes(32)

  let decipher = forge.cipher.createDecipher('AES-CBC', key)
  decipher.start({iv})
  decipher.update(input)

  let result = decipher.finish()
  if (!result) {
    throw 'decrypt failed!'
  }
  return decipher.output.toString()

}