import { useState } from 'react'
import { Container } from '@/components/ui/Container'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  return (
    <section id="contact" className="py-16 bg-white dark:bg-gray-900" style={{ scrollMarginTop: '5rem' }}>
      <Container>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center text-gray-900 dark:text-white">
            <h2 className="text-4xl font-bold">Let's Connect</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Have questions? Want to get involved? Drop me a line.</p>
          </div>

          <form 
            name="contact"
            method="POST"
            data-netlify="true"
            className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              setStatus('loading')

              // Form submission handled by Netlify

              const form = e.target as HTMLFormElement
              const formData = new FormData(form)

              // Lines added 
              formData.append('form-name', 'contact')
              formData.append('bot-field', formData.get('bot-field') || '')

              fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData as any).toString(),
              })
              .then(() => {
                setStatus('success')
                form.reset()
              })
              .catch(() => setStatus('error'))
            }}    
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 w-auto ml-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {status === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-center">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}