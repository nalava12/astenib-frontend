import * as React from 'react'
import { Container, Button, Heading, Divider, Input, Flex } from '@chakra-ui/react'

export default function () {
  const [id, setId] = React.useState('')

  return <Container maxW="container.xl" pt={4}>
    <Button colorScheme="blue" size="lg" onClick={() => location.pathname = 'editor.html'}>새 문서 작성하러 가기</Button>
    <Divider mt={2} mb={2} />
    <Heading as="h6" size="md" mb={3}>작성한 문서 보기</Heading>
    <form action="/viewer.html" method="get">
      <Flex>
        <Input maxLength={5} placeholder="문서의 ID를 입력.." value={id} onChange={e => setId(e.target.value)} name="id" size="lg" />
        <Button type="submit" size="lg" ml={3}>검색</Button>
      </Flex>
    </form>
  </Container>
}