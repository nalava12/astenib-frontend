import { Box, Button, Code, Container, FormControl, FormLabel, Heading, Icon, IconButton, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import React from 'react'
import { MdSave } from 'react-icons/md'
import ky from 'ky'

import { encryptContent } from '../encrypthelper'
import Tiptap from './tiptap'
import { API_URL } from '../settings'

export default function Editor() {
  const [title, setTitle] = React.useState('')

  const [submitCompleted, setSubmitCompleted] = React.useState(false)
  const [uniqueId, setUniqueId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordShow, setPasswordShow] = React.useState(false)
  const handlePasswordShowClick = () => setPasswordShow(!passwordShow)

  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  let getContent = () => '';
  
  function saveContent() {
    setSubmitCompleted(false)
    onPasswordModalClose()
    onModalOpen()
    let content = getContent()
    let encrypted = encryptContent(content, password)

    ky.post(API_URL + '/save', {json: {
      title,
      content: encrypted
    }}).then(res => res.text()).then(txt => {
      setUniqueId(txt)
      setSubmitCompleted(true)
    })
  }

  return (
    <Container maxW="container.xl" pt={4} height="100%" display="flex" flexDirection="column">
      <Heading mb={4}>새로 만들기</Heading>
      <FormControl id="title" isRequired>
        <FormLabel>제목</FormLabel>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목"></Input>
      </FormControl>

      <FormLabel mt={3}>내용</FormLabel>
      <Tiptap setGetContent={func => { getContent = func }} />
      <Box display="flex" justifyContent="flex-end" mt={2} mb={3}>
        <Button onClick={onPasswordModalOpen} leftIcon={<Icon w={6} h={6} as={MdSave} />} colorScheme="blue" size="lg" isDisabled={title.length == 0}>저장</Button>
      </Box>

      <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호 설정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            문서를 저장하려면 비밀번호를 설정해야 합니다.
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
            <Button variant="ghost" mr={3} onClick={onPasswordModalClose}>취소</Button>
            <Button colorScheme="blue" onClick={saveContent} isDisabled={password.length == 0}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          {!submitCompleted ? <Spinner /> : <> 
            <ModalHeader>완료!</ModalHeader>
            <ModalBody>
              방금 작성한 문서의 ID는 <Code>{uniqueId}</Code> 입니다.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => {location.reload()}}>
                새 문서 작성하러 가기
              </Button>
            </ModalFooter>
          </>
          }
        </ModalContent>
      </Modal>
    </Container>
  )
}