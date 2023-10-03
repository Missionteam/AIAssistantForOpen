import { create } from 'domain'
import React, { ChangeEvent, useState } from 'react'
import superagent from 'superagent'

type Mora = {
    text: string
    consonant: string
    consonant_length: number
    vowel: string
    vowel_length: number
    pitch: number
  }
  
  type Query = {
    accent_phrases: {
        moras: Mora[]
        accent: number
        pause_mora: Mora
    }
    speedScale: number
    pitchScale: number
    intonationScale: number
    volumeScale: number
    prePhonemeLength: number
    postPhonemeLength: number
    outputSamplingRate: number
    outputStereo: boolean
    kana: string
  }

 const VoiceBox = async (
    text: string,
  ) => {
    // 文字列からQueryを作り出す
        const speaker = 47;
        const resQuery = await superagent
          .post('http://localhost:50021/audio_query')
          .query({ speaker: speaker, text: text })
    
        if (!resQuery) return
    
        const resVoice = await superagent
          .post('http://localhost:50021/synthesis')
          .query({ speaker: speaker })
          .send(resQuery.body as Query)
          .responseType('blob')
    
        if (!resVoice) return
    
        return resVoice.body as Blob      
  };

  export default VoiceBox