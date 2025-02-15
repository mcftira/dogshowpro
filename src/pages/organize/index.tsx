import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Trophy, MapPin, Upload, CalendarIcon, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CustomMap, LocationSearch } from '@/components/map/CustomMap';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const competitionTypes = [
  'Agility',
  'Conformation (Beauty)',
  'Obedience',
  'Rally',
  'Tracking',
  'Herding',
  'Lure Coursing',
  'Dock Diving',
] as const;

const formSchema = z.object({
  name: z.string().min(3, 'Competition name must be at least 3 characters'),
  type: z.enum(competitionTypes),
  date: z.date(),
  location: z.object({
    address: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  rules: z.string().min(10, 'Rules must be at least 10 characters'),
  image: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

function FormSection({ title, children, tooltip }: { title: string; children: React.ReactNode; tooltip?: string }) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {children}
    </div>
  );
}

export default function OrganizeCompetitionPage() {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleLocationSelect = (lat: number, lng: number, newAddress: string) => {
    setSelectedLocation([lat, lng]);
    setAddress(newAddress);
    setValue('location', {
      address: newAddress,
      lat,
      lng,
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement form submission logic with Supabase
      toast({
        title: 'Success!',
        description: 'Competition created successfully.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create competition. Please try again.',
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">DogShow Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Organize a Competition</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormSection 
              title="Basic Information" 
              tooltip="Enter the fundamental details about your competition"
            >
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium">Competition Name</span>
                  <Input
                    {...register('name')}
                    placeholder="Enter competition name"
                    className={cn("mt-1", errors.name && "border-destructive")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium">Competition Type</span>
                  <select
                    {...register('type')}
                    className={cn(
                      "mt-1 block w-full rounded-md border border-input bg-background px-3 py-2",
                      errors.type && "border-destructive"
                    )}
                  >
                    <option value="">Select a type</option>
                    {competitionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
                  )}
                </label>

                <div className="block">
                  <span className="text-sm font-medium">Date</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !date && "text-muted-foreground",
                          errors.date && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          if (newDate) {
                            setValue('date', newDate);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
                  )}
                </div>
              </div>
            </FormSection>

            <FormSection 
              title="Location Details" 
              tooltip="Choose the competition venue location"
            >
              <div className="block space-y-2">
                <LocationSearch onSelect={handleLocationSelect} />
                {address && (
                  <div className="text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {address}
                  </div>
                )}
                <div className="h-[300px] rounded-md border overflow-hidden">
                  <CustomMap
                    center={[51.505, -0.09]}
                    zoom={13}
                    selectedLocation={selectedLocation}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-destructive mt-1">Please select a location</p>
                )}
              </div>
            </FormSection>

            <FormSection 
              title="Competition Details" 
              tooltip="Provide comprehensive information about the competition"
            >
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium">Description</span>
                  <Textarea
                    {...register('description')}
                    placeholder="Enter competition description"
                    className={cn("mt-1", errors.description && "border-destructive")}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                  )}
                </label>

                <label className="block">
                  <span className="text-sm font-medium">Rules & Guidelines</span>
                  <Textarea
                    {...register('rules')}
                    placeholder="Enter competition rules and guidelines"
                    className={cn("mt-1", errors.rules && "border-destructive")}
                    rows={4}
                  />
                  {errors.rules && (
                    <p className="text-sm text-destructive mt-1">{errors.rules.message}</p>
                  )}
                </label>
              </div>
            </FormSection>

            <FormSection 
              title="Media" 
              tooltip="Upload images to showcase your competition"
            >
              <div className="block">
                <span className="text-sm font-medium">Banner Image</span>
                <div className="mt-1">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {previewImage && (
                    <div className="mt-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-32 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </FormSection>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Creating...
                  </span>
                ) : (
                  'Create Competition'
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}