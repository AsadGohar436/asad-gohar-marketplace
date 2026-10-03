import { createClient } from '@supabase/supabase-js';
import type { OrderSubmission, InquirySubmission } from '../types/marketplace';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Submit an Order (Supabase with graceful fallback)
export async function submitOrder(order: OrderSubmission): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          product_slug: order.productSlug,
          product_title: order.productTitle,
          tier: order.tier,
          customer_name: order.customerName,
          customer_email: order.customerEmail,
          customer_linkedin: order.customerLinkedin,
          amount: order.amount,
          notes: order.notes,
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: data.id };
    }

    // Local simulated mode
    console.log('[Supabase Demo Mode] Order recorded:', order);
    const mockId = 'ord_' + Math.random().toString(36).substring(2, 9);
    
    // Store in localStorage for demonstration persistence
    const stored = JSON.parse(localStorage.getItem('asad_gohar_orders') || '[]');
    stored.push({ id: mockId, ...order, created_at: new Date().toISOString() });
    localStorage.setItem('asad_gohar_orders', JSON.stringify(stored));

    return { success: true, id: mockId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit order';
    console.error('Error submitting order:', err);
    return { success: false, error: message };
  }
}

// Submit an Inquiry (Supabase with graceful fallback)
export async function submitInquiry(inquiry: InquirySubmission): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          name: inquiry.name,
          email: inquiry.email,
          linkedin_url: inquiry.linkedinUrl,
          project_type: inquiry.projectType,
          estimated_timeline: inquiry.estimatedTimeline,
          message: inquiry.message,
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: data.id };
    }

    // Local simulated mode
    console.log('[Supabase Demo Mode] Inquiry recorded:', inquiry);
    const mockId = 'inq_' + Math.random().toString(36).substring(2, 9);

    const stored = JSON.parse(localStorage.getItem('asad_gohar_inquiries') || '[]');
    stored.push({ id: mockId, ...inquiry, created_at: new Date().toISOString() });
    localStorage.setItem('asad_gohar_inquiries', JSON.stringify(stored));

    return { success: true, id: mockId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit inquiry';
    console.error('Error submitting inquiry:', err);
    return { success: false, error: message };
  }
}
