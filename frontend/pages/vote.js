import Head from 'next/head'
import PageLayout from '../components/PageLayout'
import VoteIndex from '../components/VoteIndex'


export default function Vote() {
  return (
    <div>
      <PageLayout>
        予想する製品：<br/>
        予想期限まで：
        <VoteIndex/>
      </PageLayout>
    </div>
  )
}