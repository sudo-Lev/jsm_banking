'use client'

import React from 'react'
import CountUp from 'react-countup'

interface AnimatedCounterProps {
  amount: number
}

function AnimatedCounter({ amount }: AnimatedCounterProps) {
  return (
    <div className="w-full">
      <CountUp decimals={2} decimal=',' prefix='$' end={amount} />
    </div>
  )
}

export default AnimatedCounter