import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { Check, ChevronsUpDown, Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  name_9590202167: z.string().optional(),
  name_9996619642: z.unknown(),
  name_8142273188: z.string().min(1),
  name_8437955838: z.string().min(1).optional(),
  name_4804950176: z.coerce.date()
});

function RegistrosPage() {
    const languages = [
    { label: "Ração X", value: "racao_x" },
    { label: "Ração Y", value: "racao_y" },
    { label: "Ração Z", value: "racao_z" },
    { label: "Outros", value: "outros" },
  ];
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "name_4804950176": new Date()
    },
  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            <FormField
          control={form.control}
          name="name_9590202167"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ração</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("name_9590202167", language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Escola uma ração</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            <FormField
          control={form.control}
          name="name_9996619642"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>teste</FormLabel>
                <FormDescription>teste</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
        <FormField
          control={form.control}
          name="name_8142273188"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input 
                placeholder="R$ 00.00"
                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>Quanto pagou no item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name_8437955838"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input 
                placeholder=""
                disabled
                type=""
                {...field} />
              </FormControl>
              <FormDescription>Se não preenchida vai pra 1</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
      <FormField
      control={form.control}
      name="name_4804950176"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Data da compra</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
       <FormDescription>Data da compra</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default RegistrosPage;
