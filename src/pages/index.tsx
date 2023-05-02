import { styled } from "../styles"

const Button = styled('button', {
  backgroundColor : "$primary"
})

export default function Home() {
  return (
    <>
      <h1>Wello World</h1>
      <Button>Teste</Button>
    </>
  )
}
