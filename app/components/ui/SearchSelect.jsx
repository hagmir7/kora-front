import React, { useState, useEffect } from 'react'
import { Search, ChevronDown, X, Loader2, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { api } from '@/lib/clientApi'


function SearchSelect({
  apiUrl,
  value,
  onChange,
  placeholder = 'Select...',
  labelKey = 'name',
  valueKey = 'id',
  debounceMs = 300,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)


    const fetchOptions = async (query) => {
      setLoading(true)
      try {
        const url = query ? `${apiUrl}?search=${query}` : apiUrl
        const response = await api.get(url)
        const data = response.data

        setOptions(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error:', error)
        setOptions([])
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    const timer = setTimeout(() => fetchOptions(search), debounceMs)
    return () => clearTimeout(timer)
  }, [search])

  const getLabel = (item) => {
    return typeof labelKey === 'function' ? labelKey(item) : item?.[labelKey]
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-full justify-between'>
          <span className='truncate'>
            {value ? getLabel(value) : placeholder}
          </span>
          <div className='flex items-center gap-1'>
            {value && (
              <X
                className='h-4 w-4 opacity-50 hover:opacity-100 z-50'
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  onChange(null)
                }}
              />
            )}
            <ChevronDown className='h-4 w-4 opacity-50' />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command shouldFilter={false}>
          <div className='flex items-center border-b px-3'>
            <Search className='mr-2 h-4 w-4 opacity-50' />
            <Input
              placeholder='بحث...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='border-0 focus-visible:ring-0'
            />
          </div>
          <CommandList>
            {loading ? (
              <div className='flex justify-center py-6'>
                <Loader2 className='h-5 w-5 animate-spin' />
              </div>
            ) : options.length === 0 ? (
              <CommandEmpty>
                <div className='text-center py-3'>لم يتم العثور على نتائج</div>
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option[valueKey]}
                    onSelect={() => {
                      onChange(option)
                      setIsOpen(false)
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value?.[valueKey] === option[valueKey]
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                    {getLabel(option)}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchSelect;