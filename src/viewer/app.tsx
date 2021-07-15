import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button, Container, FormControl, FormLabel, IconButton, Text, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, Heading, Divider } from '@chakra-ui/react'
import ky from 'ky'
import * as React from 'react'
import { decryptContent } from '../encrypthelper'
import { API_URL, Post } from '../settings'

export default function () {
  const toast = useToast()
  const [title, setTitle] = React.useState('')
  const [time, setTime] = React.useState(0)

  const [encryptedContent, setEncryptedContent] = React.useState('')
  const [content, setContent] = React.useState('')
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  const [password, setPassword] = React.useState('')
  const [passwordShow, setPasswordShow] = React.useState(false)
  const handlePasswordShowClick = () => setPasswordShow(!passwordShow)

  React.useEffect(() => {
    let params = new URLSearchParams(location.search)
    let id = params.get('id')
    if (id == null || id.length != 5) {
      setTitle('존재하지 않는 문서입니다!')
      setContent('<p>ID를 다시 한번 확인해 주세요.</p>')
      return
    }

    ky(API_URL + '/post/' + id).json<Post>().then(obj => {
      setTitle(obj.title)
      setEncryptedContent(obj.content)
      console.log(encryptedContent)
      onModalOpen()
    }).catch(e => {
      setTitle('존재하지 않는 문서입니다!')
      setContent('<p>ID를 다시 한번 확인해 주세요.</p>')
    })
  }, [location.search])

  function decrypt() {
    let decrypted = ''
    console.log(password)
    try {
      decrypted = decryptContent(encryptedContent, password)
    } catch (e) {
      toast({
        title: '비밀번호가 올바르지 않습니다!',
        description: '다시 한번 입력해주세요!',
        status: 'error'
      })
      return
    }
    onModalClose()
    setContent(decrypted)
  }

  return <Container maxW="container.xl" pt={4}>
    <Heading as="h1" size="xl">{title}</Heading>
    <Divider mt={2} mb={2} />
    <div dangerouslySetInnerHTML={{__html: content}}></div>
    <div>
      <Button float="right" variant="outline" ml="auto" onClick={e => location.pathname = '/'}>메인 페이지로 돌아가기</Button>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호</ModalHeader>
          <ModalCloseButton onClick={_ => location.pathname = '/'} />
          <ModalBody>
            <Text>문서를 보려면 비밀번호를 입력해야 합니다.</Text>
            <Text>문서 생성시 입력했던 비밀번호를 입력해 주세요.</Text>
            <FormControl mt={4}>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={passwordShow ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="비밀번호"
                />
                <InputRightElement width="4.5rem">
                  <IconButton variant="ghost" aria-label="toggle password visibility" h="1.75rem" size="sm" onClick={handlePasswordShowClick}>
                    {passwordShow ? <ViewIcon w={5} h={5} /> : <ViewOffIcon w={5} h={5} />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={decrypt} isDisabled={password.length == 0}>
              열기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </Container>
}