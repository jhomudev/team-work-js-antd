'use client'
import JobCard from '@/components/JobCard'
import MyPagination from '@/components/MyPagination'
import { DEFAULT_PARAMS } from '@/libs/utils/getQueryParams'
import { Button, Empty } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'

const JobsList = ({ dataJobs }) => {
  const router = useRouter()
  const { data: jobs, totalJobs } = dataJobs
  const areJobs = jobs.length > 0
  const searchParams = useSearchParams()
  const { q: keyword, page } = Object.fromEntries(searchParams)

  return areJobs
    ? (
      <section className='flex-[1_0_300px]'>
        <main className='w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))]'>
          {
            jobs.map(job => <JobCard key={job.jobId} job={job} />)
          }
        </main>
        <br />
        <MyPagination totalItems={totalJobs} defaultPageSize={DEFAULT_PARAMS.rowsPerPage} currentPage={page ? Number(page) : DEFAULT_PARAMS.page} />
      </section>
      )
    : (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 60 }}
        rootClassName='w-full flex flex-col items-center justify-center bg-white rounded-lg'
        description={
          <span>
            {
              keyword ? `No se econtraron trabajos relacionados a ${keyword}` : 'No se econtraron trabajos.'
            }
          </span>
      }
      >
        <Button
          type='primary'
          onClick={() => {
            router.push('/panel/jobs')
          }}
        >Ver otros trabajos
        </Button>
      </Empty>
      )
}
export default JobsList